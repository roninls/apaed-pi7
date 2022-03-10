import { getCustomRepository } from 'typeorm';
import TransferProductLocalDonation from '../../models/TransferProductLocalDonation';
import TransferProductLocalDonationRepository from '../../repositories/TransferProductLocalDonationRepository';

interface IRequestDTO {
  product_local_donation_id: string;
  transfer_id: string;
}

class CreateTransferProductLocalDonationService {
  public async execute({
    product_local_donation_id,
    transfer_id,
  }: IRequestDTO): Promise<TransferProductLocalDonation | undefined> {
    const transferProductLocalDonationRepository = getCustomRepository(
      TransferProductLocalDonationRepository,
    );

    let transferProductLocalDonation: TransferProductLocalDonation;

    try {
      transferProductLocalDonation = await transferProductLocalDonationRepository.create(
        {
          product_local_donation_id,
          transfer_id,
        },
      );
    } catch (e) {
      return undefined;
    }
    return transferProductLocalDonation;
  }
}

export default CreateTransferProductLocalDonationService;
