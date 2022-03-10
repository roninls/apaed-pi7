import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { validate } from 'uuid';
import { cadastroSchema, updateSchema } from '../schemas/donorSchema';

import DonorsRepository from '../repositories/DonorsRepository';
import CreateDonorService from '../services/Donor/CreateDonorService';
import UpdateDonorService from '../services/Donor/UpdateDonorService';
import DeleteDonorService from '../services/Donor/DeleteDonorService';

const donorsRouter = Router();

donorsRouter.get('/', async (request, response) => {
  const donorsRepository = getCustomRepository(DonorsRepository);
  const { take = 10, skip = 0 } = request.query;

  const donors = await donorsRepository.findAndCount({
    // @ts-ignore
    where: {
      active: true,
    },
    take,
    skip,
  });

  return response.json(donors);
});

donorsRouter.get('/:document', async (request, response) => {
  const { document } = request.params;
  const donorsRepository = getCustomRepository(DonorsRepository);
  const donor = await donorsRepository.findOne({
    where: { document, active: true },
  });

  if (!donor) {
    return response.status(404).json({ error: 'Donor does not exists' });
  }
  return response.json(donor);
});

donorsRouter.post('/', async (request, response) => {
  if (!(await cadastroSchema.isValid(request.body))) {
    return response.status(400).json({ error: 'Validation fails' });
  }

  const { name, contact_id, document, email, active } = request.body;

  const createDonor = new CreateDonorService();

  let newDonor;

  try {
    newDonor = await createDonor.execute({
      name,
      contact_id,
      document,
      email,
      active,
    });
  } catch (e) {
    console.log(e);
    throw new Error();
  }

  if (!newDonor) {
    return response
      .status(500)
      .json({ error: 'An error ocurred. Please try again!' });
  }
  return response.json(newDonor);
});

donorsRouter.put('/', async (request, response) => {
  if (!(await updateSchema.isValid(request.body))) {
    return response.status(400).json({ error: 'Validation fails' });
  }

  const { id, name, contact_id, document, email, active } = request.body;

  const donorToUpdate = {
    id,
    email,
    name,
    contact_id,
    document,
    active,
  };

  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }

  const updateDonor = new UpdateDonorService();
  const updatedDonor = await updateDonor.execute(donorToUpdate);

  if (!updatedDonor) {
    return response
      .status(500)
      .json({ error: 'Something went wrong. Please try again' });
  }

  return response.json(updatedDonor);
});

donorsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }
  const deleteDonor = new DeleteDonorService();
  await deleteDonor.execute({ id });

  return response.status(204).send();
});

export default donorsRouter;
