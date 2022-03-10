import { getCustomRepository } from 'typeorm';
import NcmRepository from '../../repositories/NcmRepository';
import Ncm from '../../models/Ncm';

interface IRequestDTO {
  id: string;
  description: string;
  type_id: string;
  unity_measurement_id: string;
  minimal_qntt: number;
  minimal_more_products: number;
  ncm_code: string;
  long_description: string;
  active: boolean;
}

class UpdateNcmService {
  public async execute(toUpdateNcm: IRequestDTO): Promise<Ncm | undefined> {
    const ncmRepository = getCustomRepository(NcmRepository);
    const updateResult = await ncmRepository.update(
      {
        id: toUpdateNcm.id,
      },
      toUpdateNcm,
    );

    if (updateResult.affected) {
      return await ncmRepository.findOne({
        where: { id: toUpdateNcm.id },
      });
    }
    return undefined;
  }
}

export default UpdateNcmService;
