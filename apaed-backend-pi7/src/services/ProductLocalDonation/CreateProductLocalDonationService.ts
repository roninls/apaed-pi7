import { getCustomRepository } from 'typeorm';
import ProductLocalDonation from '../../models/ProductLocalDonation';
import ProductLocalDonationRepository from '../../repositories/ProductLocalDonationRepository';

interface IRequestDTO {
  product_id: string;
  expiration_date: string;
  donation_id: string;
  local_id: string;
  ncm_id: string;
  food_stamp_id: string;
  active: boolean;
  valor_product: number;
}

class CreateProductLocalDonationService {
  public async execute(
    ProductLocalDonationToCreate: IRequestDTO,
  ): Promise<ProductLocalDonation | undefined> {
    const productLocalDonationRepository = getCustomRepository(
      ProductLocalDonationRepository,
    );

    try {
      const newProductLocalDonation = productLocalDonationRepository.create(
        ProductLocalDonationToCreate,
      );
      await productLocalDonationRepository.save(newProductLocalDonation);
      return newProductLocalDonation;
    } catch (e) {
      console.log(e);
      return undefined;
    }
  }
}

export default CreateProductLocalDonationService;
