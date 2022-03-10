import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import UnitsMeasureRepository from '../repositories/UnitsMeasureRepository';

const unitsMeasureRouter = Router();

unitsMeasureRouter.get('/', async (request, response) => {
  const unitsMeasureRepository = getCustomRepository(UnitsMeasureRepository);
  const unitsMeasure = await unitsMeasureRepository.find({
    where: {
      active: true,
    },
  });

  return response.json(unitsMeasure);
});

export default unitsMeasureRouter;
