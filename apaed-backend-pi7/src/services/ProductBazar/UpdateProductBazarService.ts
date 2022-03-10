import { getCustomRepository } from 'typeorm';
import ProductsBazarRepository from '../../repositories/ProductsBazarRepository';
import ProductBazar from '../../models/ProductBazar';

interface IRequestDTO {
  id: string;
  product_id: string;
  price: number;
  sold: boolean;
  active: boolean;
}

class UpdateProductBazarService {
  public async execute(
    toUpdateProductBazar: IRequestDTO,
  ): Promise<ProductBazar | undefined> {
    const productsBazarRepository = getCustomRepository(
      ProductsBazarRepository,
    );
    const updateResult = await productsBazarRepository.update(
      {
        id: toUpdateProductBazar.id,
      },
      toUpdateProductBazar,
    );

    if (updateResult.affected) {
      return await productsBazarRepository.findOne({
        where: { id: toUpdateProductBazar.id },
      });
    }
    return undefined;
  }
}

export default UpdateProductBazarService;
