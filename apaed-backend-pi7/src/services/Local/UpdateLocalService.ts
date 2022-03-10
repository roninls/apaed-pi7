import { getCustomRepository } from 'typeorm';
import Local from '../../models/Local';
import LocalsRepository from '../../repositories/LocalsRepository';

interface IRequestDTO {
  id: string;
  name: string;
  document: string;
  active: boolean;
  contact_id: string;
}

class UpdateLocalService {
  public async execute(toUpdateLocal: IRequestDTO): Promise<Local | undefined> {
    const localsRepository = getCustomRepository(LocalsRepository);
    const updateResult = await localsRepository.update(
      {
        id: toUpdateLocal.id,
      },
      toUpdateLocal,
    );

    if (updateResult.affected) {
      return await localsRepository.findOne({
        where: { id: toUpdateLocal.id },
      });
    }
    return undefined;
  }
}

export default UpdateLocalService;
