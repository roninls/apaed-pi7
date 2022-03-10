import { getCustomRepository } from 'typeorm';
import ProductsRepository from '../../repositories/ProductsRepository';
import Product from '../../models/Product';

interface IRequestDTO {
  id: string;
  name: string;
  brand: string;
  ncm_id: string;
  active: boolean;
}

class UpdateProductService {
  public async execute(
    toUpdateProduct: IRequestDTO,
  ): Promise<Product | undefined> {
    const productsRepository = getCustomRepository(ProductsRepository);
    const updateResult = await productsRepository.update(
      {
        id: toUpdateProduct.id,
      },
      toUpdateProduct,
    );

    if (updateResult.affected) {
      return await productsRepository.findOne({
        where: { id: toUpdateProduct.id },
      });
    }
    return undefined;
  }
}

export default UpdateProductService;
