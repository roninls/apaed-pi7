import { getCustomRepository } from 'typeorm';
import ProductLocalDonationRepository from '../../repositories/ProductLocalDonationRepository';

interface IRequestDTO {
  local_id: string;
  product_id: string;
  expiration_date: string;
  active: boolean;
  total_amount_transfered: number;
  food_stamp_id: string;
}

class CreateTransferFoodStampService {
  public async execute({
    local_id,
    product_id,
    expiration_date,
    total_amount_transfered,
    food_stamp_id,
  }: IRequestDTO): Promise<boolean | undefined> {
    const productLocalDonationRepository = getCustomRepository(
      ProductLocalDonationRepository,
    );
    try {
      const productsToTransfer = await productLocalDonationRepository.find({
        where: {
          local_id,
          expiration_date,
          product_id,
        },
      });
      for (let i = 0; i < total_amount_transfered; i++) {
        await productLocalDonationRepository.update(
          {
            id: productsToTransfer[i].id,
          },
          {
            food_stamp_id,
          },
        );
      }
      return true;
    } catch (e) {
      console.log(e);
      return undefined;
    }
  }
}

export default CreateTransferFoodStampService;
