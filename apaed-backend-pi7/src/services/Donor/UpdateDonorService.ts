import { getCustomRepository } from 'typeorm';
import DonorsRepository from '../../repositories/DonorsRepository';
import Donor from '../../models/Donor';

interface IRequestDTO {
  id: string;
  email: string;
  name: string;
  contact_id: string;
  document: string;
  active: boolean;
}

class UpdateDonorService {
  public async execute(toUpdateDonor: IRequestDTO): Promise<Donor | undefined> {
    const donorsRepository = getCustomRepository(DonorsRepository);
    const updateResult = await donorsRepository.update(
      {
        id: toUpdateDonor.id,
      },
      toUpdateDonor,
    );

    if (updateResult.affected) {
      return await donorsRepository.findOne({
        where: { id: toUpdateDonor.id },
      });
    }
    return undefined;
  }
}

export default UpdateDonorService;
