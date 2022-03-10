import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { validate } from 'uuid';
import { cadastroSchema, updateSchema } from '../schemas/localSchema';

import LocalsRepository from '../repositories/LocalsRepository';
import CreateLocalService from '../services/Local/CreateLocalService';
import UpdateLocalService from '../services/Local/UpdateLocalService';
import DeleteLocalService from '../services/Local/DeleteLocalService';

const localsRouter = Router();

localsRouter.get('/', async (request, response) => {
  const localsRepository = getCustomRepository(LocalsRepository);
  const { take = 10, skip = 0 } = request.query;
  const locals = await localsRepository.findAndCount({
    // @ts-ignore
    where: {
      active: true,
    },
    take,
    skip,
  });

  return response.json(locals);
});

localsRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }
  const localsRepository = getCustomRepository(LocalsRepository);
  const local = await localsRepository.findOne({
    where: { id, active: true },
  });

  if (!local) {
    return response.status(404).json({ error: 'Local does not exists' });
  }
  return response.json(local);
});

localsRouter.post('/', async (request, response) => {
  if (!(await cadastroSchema.isValid(request.body))) {
    return response.status(400).json({ error: 'Validation fails' });
  }

  const { name, document, active, contact_id } = request.body;

  const createLocal = new CreateLocalService();

  let newLocal;

  try {
    newLocal = await createLocal.execute({
      name,
      document,
      active,
      contact_id,
    });
  } catch (e) {
    return response.status(500).json({
      error: `Local with document ${document} already registered in the database`,
    });
  }

  if (!newLocal) {
    return response
      .status(500)
      .json({ error: 'An error ocurred. Please try again!' });
  }
  return response.json(newLocal);
});

localsRouter.put('/', async (request, response) => {
  if (!(await updateSchema.isValid(request.body))) {
    return response.status(400).json({ error: 'Validation fails' });
  }

  const { id, name, contact_id, document, active } = request.body;

  const localToUpdate = {
    id,
    name,
    contact_id,
    document,
    active,
  };

  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }

  const updateLocal = new UpdateLocalService();
  const updatedLocal = await updateLocal.execute(localToUpdate);

  if (!updatedLocal) {
    return response
      .status(500)
      .json({ error: 'Something went wrong. Please try again' });
  }

  return response.json(updatedLocal);
});

localsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }
  const deleteLocal = new DeleteLocalService();
  await deleteLocal.execute({ id });

  return response.status(204).send();
});

export default localsRouter;
