import { getCustomRepository } from 'typeorm';
import ProductsRepository from '../../repositories/ProductsRepository';
import Product from '../../models/Product';

interface IRequestDTO {
  name: string;
  brand: string;
  ncm_id: string;
  active: boolean;
  valor_product: number;
}

class CreateProductService {
  public async execute(product: IRequestDTO): Promise<Product | undefined> {
    const productsRepository = getCustomRepository(ProductsRepository);

    try {
      const newProduct = productsRepository.create(product);
      await productsRepository.save(newProduct);
      return newProduct;
    } catch (e) {
      return undefined;
    }
  }
}

export default CreateProductService;
