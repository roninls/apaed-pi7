import { getCustomRepository } from 'typeorm';
import DonorsRepository from '../../repositories/DonorsRepository';
import Donor from '../../models/Donor';

interface IRequestDTO {
  email: string;
  name: string;
  contact_id: string;
  document: string;
  active: boolean;
}

class CreateDonorService {
  public async execute(donor: IRequestDTO): Promise<Donor | undefined> {
    const donorsRepository = getCustomRepository(DonorsRepository);

    try {
      const newDonor = donorsRepository.create(donor);
      await donorsRepository.save(newDonor);
      return newDonor;
    } catch (e) {
      return undefined;
    }
  }
}

export default CreateDonorService;
