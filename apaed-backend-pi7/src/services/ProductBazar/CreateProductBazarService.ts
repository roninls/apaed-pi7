import { getCustomRepository } from 'typeorm';
import ProductBazar from '../../models/ProductBazar';
import ProductsBazarRepository from '../../repositories/ProductsBazarRepository';

interface IRequestDTO {
  product_id: string;
  price: number;
  sold: boolean;
  active: boolean;
}

class CreateProductBazarService {
  public async execute(
    productBazar: IRequestDTO,
  ): Promise<ProductBazar | undefined> {
    const productsBazarRepository = getCustomRepository(
      ProductsBazarRepository,
    );

    try {
      const newProductBazar = productsBazarRepository.create(productBazar);
      await productsBazarRepository.save(newProductBazar);
      return newProductBazar;
    } catch (e) {
      return undefined;
    }
  }
}

export default CreateProductBazarService;
