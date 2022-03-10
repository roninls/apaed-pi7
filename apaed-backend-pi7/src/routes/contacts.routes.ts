import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { validate } from 'uuid';
import { cadastroSchema, updateSchema } from '../schemas/contactSchema';

import ContactsRepository from '../repositories/ContactsRepository';
import CreateContactService from '../services/Contact/CreateContactService';
import DeleteContactService from '../services/Contact/DeleteContactService';
import UpdateContactService from '../services/Contact/UpdateContactService';

const contactsRouter = Router();

contactsRouter.get('/', async (request, response) => {
  const contactsRepository = getCustomRepository(ContactsRepository);
  const contacts = await contactsRepository.find();

  return response.json(contacts);
});

contactsRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }
  const contactsRepository = getCustomRepository(ContactsRepository);
  const contact = await contactsRepository.findOne({
    where: { id },
  });

  if (!contact) {
    return response.status(404).json({ error: 'Contact does not exists' });
  }
  return response.json(contact);
});

contactsRouter.post('/', async (request, response) => {
  if (!(await cadastroSchema.isValid(request.body))) {
    return response.status(400).json({ error: 'Validation fails' });
  }

  const {
    public_place,
    complement,
    number,
    district,
    city,
    state,
    country,
    zip_code,
    phone,
  } = request.body;

  const createContact = new CreateContactService();

  let newContact;

  try {
    newContact = await createContact.execute({
      public_place,
      complement,
      number,
      district,
      city,
      state,
      country,
      zip_code,
      phone,
    });
  } catch (e) {
    return response.status(500).json({
      error: 'An error ocurred. Please try again!',
    });
  }

  if (!newContact) {
    return response
      .status(500)
      .json({ error: 'An error ocurred. Please try again!' });
  }
  return response.json(newContact);
});

contactsRouter.put('/', async (request, response) => {
  if (!(await updateSchema.isValid(request.body))) {
    return response.status(400).json({ error: 'Validation fails' });
  }

  const {
    id,
    public_place,
    complement,
    number,
    district,
    city,
    state,
    country,
    zip_code,
    phone,
  } = request.body;

  const contactToUpdate = {
    id,
    public_place,
    complement,
    number,
    district,
    city,
    state,
    country,
    zip_code,
    phone,
  };

  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }

  const updateContact = new UpdateContactService();
  const updatedContact = await updateContact.execute(contactToUpdate);

  if (!updatedContact) {
    return response
      .status(500)
      .json({ error: 'Something went wrong. Please try again' });
  }

  return response.json(updatedContact);
});

contactsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }
  const deleteContact = new DeleteContactService();
  await deleteContact.execute({ id });

  return response.status(204).send();
});

export default contactsRouter;
