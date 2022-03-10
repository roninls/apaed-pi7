import { getCustomRepository } from 'typeorm';

import ContactsRepository from '../../repositories/ContactsRepository';
import Contact from '../../models/Contact';

interface IRequestDTO {
  public_place: string;
  complement: string;
  number: string;
  district: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
  phone: string;
}

class CreateContactService {
  public async execute(contact: IRequestDTO): Promise<Contact | undefined> {
    const contactsRepository = getCustomRepository(ContactsRepository);

    try {
      const newContact = contactsRepository.create(contact);
      await contactsRepository.save(newContact);
      return newContact;
    } catch (e) {
      return undefined;
    }
  }
}

export default CreateContactService;
