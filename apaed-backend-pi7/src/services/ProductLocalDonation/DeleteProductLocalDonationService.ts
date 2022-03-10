import { getCustomRepository } from 'typeorm';
import ProductLocalDonationRepository from '../../repositories/ProductLocalDonationRepository';

interface IRequestDTO {
  id: string;
}

class DeleteProductLocalDonationService {
  public async execute({ id }: IRequestDTO): Promise<void> {
    const productLocalDonationRepository = getCustomRepository(
      ProductLocalDonationRepository,
    );
    await productLocalDonationRepository.delete({
      id,
    });
  }
}

export default DeleteProductLocalDonationService;
