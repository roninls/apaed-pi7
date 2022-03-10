import { getCustomRepository } from 'typeorm';

import ContactsRepository from '../../repositories/ContactsRepository';
import Contact from '../../models/Contact';

interface IRequestDTO {
  id: string;
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

class UpdateContactService {
  public async execute(
    toUpdateContact: IRequestDTO,
  ): Promise<Contact | undefined> {
    const contactsRepository = getCustomRepository(ContactsRepository);
    const updateResult = await contactsRepository.update(
      {
        id: toUpdateContact.id,
      },
      toUpdateContact,
    );

    if (updateResult.affected) {
      return await contactsRepository.findOne({
        where: { id: toUpdateContact.id },
      });
    }
    return undefined;
  }
}

export default UpdateContactService;
