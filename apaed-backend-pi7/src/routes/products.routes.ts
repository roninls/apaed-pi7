import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { validate } from 'uuid';
import { cadastroSchema, updateSchema } from '../schemas/productSchema';

import ProductsRepository from '../repositories/ProductsRepository';
import CreateProductService from '../services/Product/CreateProductService';
import DeleteProductService from '../services/Product/DeleteProductService';
import UpdateProductService from '../services/Product/UpdateProductService';

const productsRouter = Router();

productsRouter.get('/', async (request, response) => {
  const productsRepository = getCustomRepository(ProductsRepository);
  const { take = 10, skip = 0 } = request.query;

  const products = await productsRepository.findAndCount({
    // @ts-ignore
    where: {
      active: true,
    },
    take,
    skip,
  });

  return response.json(products);
});

productsRouter.get('/:ncm_id', async (request, response) => {
  const { ncm_id } = request.params;
  const productsRepository = getCustomRepository(ProductsRepository);
  const products = await productsRepository.find({
    where: {
      ncm_id,
      active: true,
    },
  });

  if (!products || products.length === 0) {
    return response
      .status(404)
      .json({ error: 'Product with given ncm does not exists' });
  }
  return response.json(products);
});

productsRouter.post('/', async (request, response) => {
  if (!(await cadastroSchema.isValid(request.body))) {
    return response.status(400).json({ error: 'Validation fails' });
  }

  const { name, brand, ncm_id, active, valor_product } = request.body;

  const createProduct = new CreateProductService();

  let newProduct;

  try {
    newProduct = await createProduct.execute({
      name,
      brand,
      ncm_id,
      active,
      valor_product,
    });
  } catch (e) {
    console.log(e);
    throw new Error();
  }

  if (!newProduct) {
    return response
      .status(500)
      .json({ error: 'An error ocurred. Please try again!' });
  }
  return response.json(newProduct);
});

productsRouter.put('/', async (request, response) => {
  if (!(await updateSchema.isValid(request.body))) {
    return response.status(400).json({ error: 'Validation fails' });
  }

  const { id, name, brand, ncm_id, active, valor_product } = request.body;

  const productToUpdate = {
    id,
    name,
    brand,
    ncm_id,
    active,
    valor_product,
  };

  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }

  const updateProduct = new UpdateProductService();
  const updatedProduct = await updateProduct.execute(productToUpdate);

  if (!updatedProduct) {
    return response
      .status(500)
      .json({ error: 'Something went wrong. Please try again' });
  }

  return response.json(updatedProduct);
});

productsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }
  const deleteProduct = new DeleteProductService();
  await deleteProduct.execute({ id });

  return response.status(204).send();
});

export default productsRouter;
