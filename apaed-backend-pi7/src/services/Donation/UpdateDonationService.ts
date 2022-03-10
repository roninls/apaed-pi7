import { getCustomRepository } from 'typeorm';
import Donation from '../../models/Donation';
import DonationsRepository from '../../repositories/DonationsRepository';

interface IRequestDTO {
  id: string;
  donor_id: string;
  donation_date: string;
  type: string;
  active: boolean;
}

class UpdateDonationService {
  public async execute(
    tpUpdateDonation: IRequestDTO,
  ): Promise<Donation | undefined> {
    const donationsRepository = getCustomRepository(DonationsRepository);
    const updateResult = await donationsRepository.update(
      {
        id: tpUpdateDonation.id,
      },
      tpUpdateDonation,
    );

    if (updateResult.affected) {
      return await donationsRepository.findOne({
        where: { id: tpUpdateDonation.id },
      });
    }
    return undefined;
  }
}

export default UpdateDonationService;
