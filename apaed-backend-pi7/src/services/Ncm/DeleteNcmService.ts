import { getCustomRepository } from 'typeorm';
import NcmRepository from '../../repositories/NcmRepository';

interface IRequestDTO {
  id: string;
}

class DeleteNcmService {
  public async execute({ id }: IRequestDTO): Promise<void> {
    const ncmRepository = getCustomRepository(NcmRepository);
    await ncmRepository.update(
      {
        id,
      },
      {
        active: false,
      },
    );
  }
}

export default DeleteNcmService;
