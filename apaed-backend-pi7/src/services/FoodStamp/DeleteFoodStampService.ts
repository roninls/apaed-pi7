import { getCustomRepository } from 'typeorm';
import FoodStampRepository from '../../repositories/FoodStampRepository';

interface IRequestDTO {
  id: string;
}

class DeleteFoodStampService {
  public async execute({ id }: IRequestDTO): Promise<void> {
    const foodStampRepository = getCustomRepository(FoodStampRepository);
    await foodStampRepository.update(
      {
        id,
      },
      {
        active: false,
      },
    );
  }
}

export default DeleteFoodStampService;
