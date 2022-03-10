import { getCustomRepository } from 'typeorm';
import ProductsRepository from '../../repositories/ProductsRepository';

interface IRequestDTO {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: IRequestDTO): Promise<void> {
    const productsRepository = getCustomRepository(ProductsRepository);
    await productsRepository.update(
      {
        id,
      },
      {
        active: false,
      },
    );
  }
}

export default DeleteProductService;
