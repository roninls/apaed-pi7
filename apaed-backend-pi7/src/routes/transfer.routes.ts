import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { validate } from 'uuid';
import {
  cadastroFoodStampSchema,
  cadastroSchema,
} from '../schemas/transferSchema';

import TransferRepository from '../repositories/TransferRepository';
import CreateTransferService from '../services/Transfer/CreateTransferService';
import DeleteTransferService from '../services/Transfer/DeleteTransferService';
import CreateTransferFoodStampService from '../services/Transfer/CreateTransferFoodStampService';

const transferRouter = Router();

transferRouter.get('/', async (request, response) => {
  const transferRepository = getCustomRepository(TransferRepository);
  const { take = 10, skip = 0 } = request.query;

  const transfer = await transferRepository.findAndCount({
    // @ts-ignore
    where: {
      active: true,
    },
    take,
    skip,
  });

  return response.json(transfer);
});

transferRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }
  const transferRepository = getCustomRepository(TransferRepository);
  const transfer = await transferRepository.findOne({
    where: { id, active: true },
  });

  if (!transfer) {
    return response.status(404).json({ error: 'Transfer does not exists' });
  }
  return response.json(transfer);
});

transferRouter.post('/', async (request, response) => {
  if (!(await cadastroSchema.isValid(request.body))) {
    return response.status(400).json({ error: 'Validation fails' });
  }

  // @ts-ignore
  const { localId } = request;

  const {
    destiny_id,
    product_id,
    description,
    total_amount_transfered,
    active,
    expiration_date,
    product_name,
    product_brand,
    product_ncm_code,
  } = request.body;

  const createTransfer = new CreateTransferService();

  try {
    const transfer = await createTransfer.execute({
      origin_id: localId,
      destiny_id,
      product_id,
      description,
      active,
      expiration_date,
      total_amount_transfered,
      product_name,
      product_brand,
      product_ncm_code,
    });
    if (!transfer)
      return response
        .status(500)
        .json({ error: 'An error ocurred. Please try again!' });
  } catch (e) {
    console.log(e);
    throw new Error();
  }

  return response.json({ message: 'Transaction added successfully!' });
});

transferRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }
  const deleteTransfer = new DeleteTransferService();
  await deleteTransfer.execute({ id });

  return response.status(204).send();
});

transferRouter.post('/foodStamp', async (request, response) => {
  if (!(await cadastroFoodStampSchema.isValid(request.body))) {
    return response.status(400).json({ error: 'Validation fails' });
  }

  // @ts-ignore
  const { localId } = request;
  const {
    product_id,
    active,
    expiration_date,
    total_amount_transfered,
    food_stamp_id,
  } = request.body;

  const createTransferFoodStamp = new CreateTransferFoodStampService();

  try {
    const transfer = await createTransferFoodStamp.execute({
      local_id: localId,
      product_id,
      active,
      expiration_date,
      total_amount_transfered,
      food_stamp_id,
    });
    if (!transfer)
      return response
        .status(500)
        .json({ error: 'An error ocurred. Please try again!' });
  } catch (e) {
    console.log(e);
    throw new Error();
  }

  return response.json({
    message: 'Food stamp transaction added successfully!',
  });
});

export default transferRouter;
