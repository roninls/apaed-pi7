import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import RolesRepository from '../repositories/RolesRepository';

const rolesRouter = Router();

rolesRouter.get('/', async (request, response) => {
  const rolesRepository = getCustomRepository(RolesRepository);
  const roles = await rolesRepository.find({
    where: {
      active: true,
    },
  });

  return response.json(roles);
});

export default rolesRouter;
