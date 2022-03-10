import { getCustomRepository } from 'typeorm';
import DonationsRepository from '../../repositories/DonationsRepository';

interface IRequestDTO {
  id: string;
}

class DeleteDonationService {
  public async execute({ id }: IRequestDTO): Promise<void> {
    const donationsRepository = getCustomRepository(DonationsRepository);
    await donationsRepository.update(
      {
        id,
      },
      {
        active: false,
      },
    );
  }
}

export default DeleteDonationService;
