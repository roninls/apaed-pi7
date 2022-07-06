import { getCustomRepository } from 'typeorm';
import ProductLocalDonation from '../../models/ProductLocalDonation';
import ProductLocalDonationRepository from '../../repositories/ProductLocalDonationRepository';

interface IRequestDTO {
  id: string;
  product_id: string;
  expiration_date: string;
  donation_id: string;
  local_id: string;
  ncm_id: string;
  food_stamp_id: string;
  active: boolean;
  valor_product: number;
}

class UpdateProductLocalDonationService {
  public async execute(
    toUpdateProductLocalDonation: IRequestDTO,
  ): Promise<ProductLocalDonation | undefined> {
    const productLocalDonationRepository = getCustomRepository(
      ProductLocalDonationRepository,
    );
    const updateResult = await productLocalDonationRepository.update(
      {
        id: toUpdateProductLocalDonation.id,
      },
      toUpdateProductLocalDonation,
    );

    if (updateResult.affected) {
      return await productLocalDonationRepository.findOne({
        where: { id: toUpdateProductLocalDonation.id },
      });
    }
    return undefined;
  }
}

export default UpdateProductLocalDonationService;
