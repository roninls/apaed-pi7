import { getCustomRepository } from 'typeorm';
import Donation from '../../models/Donation';
import DonationsRepository from '../../repositories/DonationsRepository';

interface IRequestDTO {
  donor_id: string;
  donation_date: string;
  type: string;
  active: boolean;
}

class CreateDonationService {
  public async execute(donation: IRequestDTO): Promise<Donation | undefined> {
    const donationsRepository = getCustomRepository(DonationsRepository);
    try {
      const newDonation = donationsRepository.create(donation);
      await donationsRepository.save(newDonation);
      return newDonation;
    } catch (e) {
      console.log(e);
      return undefined;
    }
  }
}

export default CreateDonationService;
