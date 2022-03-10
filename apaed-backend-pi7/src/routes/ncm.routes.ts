import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { validate } from 'uuid';
import { cadastroSchema, updateSchema } from '../schemas/ncmSchema';

import NcmRepository from '../repositories/NcmRepository';
import CreateNcmService from '../services/Ncm/CreateNcmService';
import DeleteNcmService from '../services/Ncm/DeleteNcmService';
import UpdateNcmService from '../services/Ncm/UpdateNcmService';

const ncmRouter = Router();

ncmRouter.get('/', async (request, response) => {
  const ncmRepository = getCustomRepository(NcmRepository);
  const { take = 10, skip = 0 } = request.query;

  const ncm = await ncmRepository.findAndCount({
    // @ts-ignore
    where: {
      active: true,
    },
    take,
    skip,
  });

  return response.json(ncm);
});

ncmRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }
  const ncmRepository = getCustomRepository(NcmRepository);
  const ncm = await ncmRepository.findOne({
    where: { id, active: true },
  });

  if (!ncm) {
    return response.status(404).json({ error: 'Ncm does not exists' });
  }
  return response.json(ncm);
});

ncmRouter.post('/', async (request, response) => {
  if (!(await cadastroSchema.isValid(request.body))) {
    return response.status(400).json({ error: 'Validation fails' });
  }

  const {
    description,
    type_id,
    unity_measurement_id,
    minimal_more_products,
    minimal_qntt,
    ncm_code,
    long_description,
    active,
  } = request.body;

  const createNcm = new CreateNcmService();

  let newNcm;

  try {
    newNcm = await createNcm.execute({
      description,
      type_id,
      unity_measurement_id,
      minimal_more_products,
      minimal_qntt,
      ncm_code,
      long_description,
      active,
    });
  } catch (e) {
    console.log(e);
    throw new Error();
  }

  if (!newNcm) {
    return response
      .status(500)
      .json({ error: 'An error ocurred. Please try again!' });
  }
  return response.json(newNcm);
});

ncmRouter.put('/', async (request, response) => {
  if (!(await updateSchema.isValid(request.body))) {
    return response.status(400).json({ error: 'Validation fails' });
  }

  const {
    id,
    description,
    type_id,
    unity_measurement_id,
    minimal_more_products,
    minimal_qntt,
    ncm_code,
    long_description,
    active,
  } = request.body;

  const ncmToUpdate = {
    id,
    description,
    type_id,
    unity_measurement_id,
    minimal_more_products,
    minimal_qntt,
    ncm_code,
    long_description,
    active,
  };

  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }

  const updateNcm = new UpdateNcmService();
  const updatedNcm = await updateNcm.execute(ncmToUpdate);

  if (!updatedNcm) {
    return response
      .status(500)
      .json({ error: 'Something went wrong. Please try again' });
  }

  return response.json(updatedNcm);
});

ncmRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }
  const deleteNcm = new DeleteNcmService();
  await deleteNcm.execute({ id });

  return response.status(204).send();
});

export default ncmRouter;
