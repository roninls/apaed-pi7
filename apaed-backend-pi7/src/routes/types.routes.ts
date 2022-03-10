import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import TypesRepository from '../repositories/TypesRepository';

const typesRouter = Router();

typesRouter.get('/', async (request, response) => {
  const typesRepository = getCustomRepository(TypesRepository);
  const types = await typesRepository.find({
    where: {
      active: true,
    },
  });

  return response.json(types);
});

export default typesRouter;
