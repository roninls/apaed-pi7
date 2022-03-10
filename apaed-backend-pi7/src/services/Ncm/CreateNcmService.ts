import { getCustomRepository } from 'typeorm';
import NcmRepository from '../../repositories/NcmRepository';
import Ncm from '../../models/Ncm';

interface IRequestDTO {
  description: string;
  type_id: string;
  unity_measurement_id: string;
  minimal_qntt: number;
  minimal_more_products: number;
  ncm_code: string;
  long_description: string;
  active: boolean;
}

class CreateNcmService {
  public async execute(ncm: IRequestDTO): Promise<Ncm | undefined> {
    const ncmsRepository = getCustomRepository(NcmRepository);

    try {
      const newNcm = ncmsRepository.create(ncm);
      await ncmsRepository.save(newNcm);
      return newNcm;
    } catch (e) {
      return undefined;
    }
  }
}

export default CreateNcmService;
