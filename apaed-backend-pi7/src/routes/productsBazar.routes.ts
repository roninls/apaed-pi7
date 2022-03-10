import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { validate } from 'uuid';
import { cadastroSchema, updateSchema } from '../schemas/productBazarSchema';

import ProductsBazarRepository from '../repositories/ProductsBazarRepository';
import CreateProductBazarService from '../services/ProductBazar/CreateProductBazarService';
import DeleteProductBazarService from '../services/ProductBazar/DeleteProductBazarService';
import UpdateProductBazarService from '../services/ProductBazar/UpdateProductBazarService';

const productsRouter = Router();

productsRouter.get('/', async (request, response) => {
  const productsBazarRepository = getCustomRepository(ProductsBazarRepository);
  const { take = 10, skip = 0 } = request.query;

  const products = await productsBazarRepository.findAndCount({
    // @ts-ignore
    where: {
      active: true,
    },
    take,
    skip,
  });

  return response.json(products);
});

productsRouter.post('/', async (request, response) => {
  if (!(await cadastroSchema.isValid(request.body))) {
    return response.status(400).json({ error: 'Validation fails' });
  }

  const { product_id, price, sold, active } = request.body;

  const createProduct = new CreateProductBazarService();

  let newProductBazar;

  try {
    newProductBazar = await createProduct.execute({
      product_id,
      price,
      sold,
      active,
    });
  } catch (e) {
    console.log(e);
    throw new Error();
  }

  if (!newProductBazar) {
    return response
      .status(500)
      .json({ error: 'An error ocurred. Please try again!' });
  }
  return response.json(newProductBazar);
});

productsRouter.put('/', async (request, response) => {
  if (!(await updateSchema.isValid(request.body))) {
    return response.status(400).json({ error: 'Validation fails' });
  }

  const { id, product_id, price, sold, active } = request.body;

  const productBazarToUpdate = {
    id,
    product_id,
    price,
    sold,
    active,
  };

  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }

  const updateProductBazar = new UpdateProductBazarService();
  const updatedProductBazar = await updateProductBazar.execute(
    productBazarToUpdate,
  );

  if (!updatedProductBazar) {
    return response
      .status(500)
      .json({ error: 'Something went wrong. Please try again' });
  }

  return response.json(updatedProductBazar);
});

productsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }
  const deleteProductBazar = new DeleteProductBazarService();
  await deleteProductBazar.execute({ id });

  return response.status(204).send();
});

export default productsRouter;
