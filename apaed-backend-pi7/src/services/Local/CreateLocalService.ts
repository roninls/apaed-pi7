import { getCustomRepository } from 'typeorm';
import LocalsRepository from '../../repositories/LocalsRepository';
import Local from '../../models/Local';

interface IRequestDTO {
  name: string;
  document: string;
  active: boolean;
  contact_id: string;
}

class CreateLocalService {
  public async execute(local: IRequestDTO): Promise<Local | undefined> {
    const localsRepository = getCustomRepository(LocalsRepository);

    const checkLocalExists = await localsRepository.findOne({
      where: { document: local.document },
    });

    if (checkLocalExists) {
      throw new Error(
        `Local with document ${local.document} already registered in the database`,
      );
    }

    try {
      const newLocal = localsRepository.create(local);
      await localsRepository.save(newLocal);
      return newLocal;
    } catch (e) {
      return undefined;
    }
  }
}

export default CreateLocalService;
