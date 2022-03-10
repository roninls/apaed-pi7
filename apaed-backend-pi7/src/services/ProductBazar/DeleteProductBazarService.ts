import { getCustomRepository } from 'typeorm';
import ProductsBazarRepository from '../../repositories/ProductsBazarRepository';

interface IRequestDTO {
  id: string;
}

class DeleteProductBazarService {
  public async execute({ id }: IRequestDTO): Promise<void> {
    const productsBazarRepository = getCustomRepository(
      ProductsBazarRepository,
    );
    await productsBazarRepository.update(
      {
        id,
      },
      {
        active: false,
      },
    );
  }
}

export default DeleteProductBazarService;
