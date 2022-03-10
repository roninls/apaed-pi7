import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { validate } from 'uuid';
import { cadastroSchema, updateSchema } from '../schemas/donationSchema';

import DonationsRepository from '../repositories/DonationsRepository';
import CreateDonationService from '../services/Donation/CreateDonationService';
import UpdateDonationService from '../services/Donation/UpdateDonationService';
import DeleteDonationService from '../services/Donation/DeleteDonationService';

const donationsRouter = Router();

donationsRouter.get('/', async (request, response) => {
  const donationsRepository = getCustomRepository(DonationsRepository);
  const donations = await donationsRepository.find({
    where: {
      active: true,
    },
  });

  return response.json(donations);
});

donationsRouter.get('/:donor_id', async (request, response) => {
  const { donor_id } = request.params;

  if (!validate(donor_id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }

  const donationsRepository = getCustomRepository(DonationsRepository);
  const donations = await donationsRepository.find({
    where: { donor_id, active: true },
  });

  if (!donations || donations.length === 0) {
    return response
      .status(404)
      .json({ error: 'Donation for requested donor does not exists' });
  }
  return response.json(donations);
});

donationsRouter.post('/', async (request, response) => {
  if (!(await cadastroSchema.isValid(request.body))) {
    return response.status(400).json({ error: 'Validation fails' });
  }

  const { donor_id, donation_date, type, active } = request.body;

  const createDonation = new CreateDonationService();

  let newDonation;

  try {
    newDonation = await createDonation.execute({
      donor_id,
      donation_date,
      type,
      active,
    });
  } catch (e) {
    console.log(e);
    throw new Error();
  }

  if (!newDonation) {
    return response
      .status(500)
      .json({ error: 'An error ocurred. Please try again!' });
  }
  return response.json(newDonation);
});

donationsRouter.put('/', async (request, response) => {
  if (!(await updateSchema.isValid(request.body))) {
    return response.status(400).json({ error: 'Validation fails' });
  }

  const { id, donor_id, donation_date, active, type } = request.body;

  const donationToUpdate = {
    id,
    donor_id,
    donation_date,
    type,
    active,
  };

  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }

  const updateDonation = new UpdateDonationService();
  const updatedDonation = await updateDonation.execute(donationToUpdate);

  if (!updatedDonation) {
    return response
      .status(500)
      .json({ error: 'Something went wrong. Please try again' });
  }

  return response.json(updatedDonation);
});

donationsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }
  const deleteDonation = new DeleteDonationService();
  await deleteDonation.execute({ id });

  return response.status(204).send();
});

export default donationsRouter;
