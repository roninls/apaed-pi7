import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { validate } from 'uuid';
import {
  cadastroSchema,
  updateSchema,
} from '../schemas/productLocalDonationSchema';

import ProductLocalDonationRepository from '../repositories/ProductLocalDonationRepository';
import CreateProductLocalDonationService from '../services/ProductLocalDonation/CreateProductLocalDonationService';
import DeleteProductLocalDonationService from '../services/ProductLocalDonation/DeleteProductLocalDonationService';
import UpdateProductLocalDonationService from '../services/ProductLocalDonation/UpdateProductLocalDonationService';

const productLocalDonationRouter = Router();

productLocalDonationRouter.get('/', async (request, response) => {
  const { take = 10, skip = 0 } = request.query;
  const productLocalDonationRepository = getCustomRepository(
    ProductLocalDonationRepository,
  );

  const productLocalDonation = await productLocalDonationRepository.query(
    'select count(*), food_stamp_id, MIN(pld.id) as id, MIN(n.minimal_more_products) as minimal_more_products,MIN(n.minimal_qntt) as minimal_qntt,' +
      'MIN(n.id) as ncm_id, n.ncm_code, expiration_date,p.valor_product as valor_product,p.name, p.brand, product_id, um.unity_measurement' +
      ' from product_local_donation pld' +
      ' left outer join product p on pld.product_id = p.id' +
      ' left outer join ncm n on p.ncm_id = n.id' +
      ' left outer join units_measure um on n.unity_measurement_id = um.id' +
      ' left outer join food_stamp fs on pld.food_stamp_id = fs.id' +
      ' where local_id = $1 and food_stamp_id is NULL ' +
      'group by product_id, expiration_date, n.ncm_code, p.name, p.brand, um.unity_measurement, food_stamp_id, p.valor_product LIMIT $2 OFFSET $3',
    // @ts-ignore
    [request.localId, take, skip],
  );

  const productLocalDonationWithTotalAmount = await Promise.all(
    // @ts-ignore
    productLocalDonation.map(async product => {
      const count = await productLocalDonationRepository
        .createQueryBuilder('product_local_donation')
        .where(
          'product_local_donation.local_id = :local_id',
          // @ts-ignore
          { local_id: request.localId },
        )
        .andWhere('product_local_donation.ncm_id = :ncm_id', {
          ncm_id: product.ncm_id,
        })
        .groupBy('product_id')
        .getCount();
      // @ts-ignore
      // eslint-disable-next-line no-param-reassign
      product.totalAmount = count;
      return product;
    }),
  );

  const count = await productLocalDonationRepository.query(
    'select count(*),food_stamp_id, MIN(pld.id) as id, MIN(n.minimal_more_products) as minimal_more_products, MIN(n.minimal_qntt) as minimal_qntt,' +
      'MIN(n.id) as ncm_id, n.ncm_code, expiration_date,p.valor_product as valor_product,p.name, p.brand, product_id, um.unity_measurement' +
      ' from product_local_donation pld' +
      ' left outer join product p on pld.product_id = p.id' +
      ' left outer join ncm n on p.ncm_id = n.id' +
      ' left outer join units_measure um on n.unity_measurement_id = um.id' +
      ' left outer join food_stamp fs on pld.food_stamp_id = fs.id' +
      ' where local_id = $1 and food_stamp_id is NULL ' +
      'group by product_id, expiration_date, n.ncm_code, p.name, p.brand, um.unity_measurement, food_stamp_id, p.valor_product',
    // @ts-ignore
    [request.localId],
  );
  // p.valor_product as valor_product

  return response.json([
    [...productLocalDonationWithTotalAmount],
    count.length,
  ]);
});

productLocalDonationRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }
  const productLocalDonationRepository = getCustomRepository(
    ProductLocalDonationRepository,
  );
  const productLocalDonation = await productLocalDonationRepository.findOne({
    where: { id },
  });

  if (!productLocalDonation) {
    return response
      .status(404)
      .json({ error: 'ProductLocalDonation does not exists' });
  }
  return response.json(productLocalDonation);
});

productLocalDonationRouter.get(
  '/foodStamp/:food_stamp_id',
  async (request, response) => {
    const { food_stamp_id } = request.params;
    if (!validate(food_stamp_id)) {
      return response.status(400).json({ error: 'Invalid Id' });
    }
    const productLocalDonationRepository = getCustomRepository(
      ProductLocalDonationRepository,
    );
    const { take = 10, skip = 0 } = request.query;
    const productLocalDonation = await productLocalDonationRepository.findAndCount(
      {
        // @ts-ignore
        where: {
          food_stamp_id,
        },
        take,
        skip,
      },
    );

    if (!productLocalDonation) {
      return response
        .status(404)
        .json({ error: 'ProductLocalDonation does not exists' });
    }
    return response.json(productLocalDonation);
  },
);

productLocalDonationRouter.post('/', async (request, response) => {
  if (!(await cadastroSchema.isValid(request.body))) {
    return response.status(400).json({ error: 'Validation fails' });
  }

  // @ts-ignore
  const { localId } = request;
  const {
    product_id,
    expiration_date,
    donation_id,
    ncm_id,
    food_stamp_id,
    amount,
    active,
    valor_product,
  } = request.body;

  const createProductLocalDonation = new CreateProductLocalDonationService();

  try {
    for (let i = 0; i < amount; i++) {
      const productLocalDonation = await createProductLocalDonation.execute({
        local_id: localId,
        product_id,
        expiration_date,
        ncm_id,
        food_stamp_id,
        donation_id,
        active,
        valor_product,
      });
      if (!productLocalDonation)
        return response
          .status(500)
          .json({ error: 'An error ocurred. Please try again!' });
    }
  } catch (e) {
    console.log(e);
    throw new Error();
  }

  return response.json({ message: 'Products added successfully!' });
});

productLocalDonationRouter.put('/', async (request, response) => {
  if (!(await updateSchema.isValid(request.body))) {
    return response.status(400).json({ error: 'Validation fails' });
  }

  // @ts-ignore
  const { localId } = request;
  const {
    id,
    product_id,
    expiration_date,
    donation_id,
    ncm_id,
    food_stamp_id,
    active,
    valor_product,
  } = request.body;

  const productLocalDonationToUpdate = {
    id,
    product_id,
    expiration_date,
    donation_id,
    ncm_id,
    food_stamp_id,
    active,
    local_id: localId,
    valor_product,
  };

  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }

  const updateProductLocalDonation = new UpdateProductLocalDonationService();
  const updatedProductLocalDonation = await updateProductLocalDonation.execute(
    productLocalDonationToUpdate,
  );

  if (!updatedProductLocalDonation) {
    return response
      .status(500)
      .json({ error: 'Something went wrong. Please try again' });
  }

  return response.json(updatedProductLocalDonation);
});

productLocalDonationRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }
  const deleteProductLocalDonation = new DeleteProductLocalDonationService();
  await deleteProductLocalDonation.execute({ id });

  return response.status(204).send();
});

export default productLocalDonationRouter;
