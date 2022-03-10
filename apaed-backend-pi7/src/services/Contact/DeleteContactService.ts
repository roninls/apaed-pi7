import { getCustomRepository } from 'typeorm';

import ContactsRepository from '../../repositories/ContactsRepository';

interface IRequestDTO {
  id: string;
}

class DeleteContactService {
  public async execute({ id }: IRequestDTO): Promise<void> {
    const contactsRepository = getCustomRepository(ContactsRepository);
    await contactsRepository.delete({
      id,
    });
  }
}

export default DeleteContactService;
