import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { validate } from 'uuid';
import { cadastroSchema, updateSchema } from '../schemas/userSchema';

import UsersRepository from '../repositories/UsersRepository';
import CreateUserService from '../services/User/CreateUserService';
import DeleteUserService from '../services/User/DeleteUserService';
import UpdateUserService from '../services/User/UpdateUserService';

const usersRouter = Router();

usersRouter.get('/', async (request, response) => {
  const usersRepository = getCustomRepository(UsersRepository);
  const { take = 10, skip = 0 } = request.query;
  const users = await usersRepository.findAndCount({
    // @ts-ignore
    where: {
      active: true,
    },
    take,
    skip,
  });

  return response.json(users);
});

usersRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }
  const usersRepository = getCustomRepository(UsersRepository);
  const user = await usersRepository.findOne({
    where: { id, active: true },
  });

  if (!user) {
    return response.status(404).json({ error: 'User does not exists' });
  }
  return response.json(user);
});

usersRouter.post('/', async (request, response) => {
  if (!(await cadastroSchema.isValid(request.body))) {
    return response.status(400).json({ error: 'Validation fails' });
  }

  const { name, password, local_id, role_id, active } = request.body;

  const createUser = new CreateUserService();

  let newUser;

  try {
    newUser = await createUser.execute({
      name,
      password,
      local_id,
      role_id,
      active,
    });
  } catch (e) {
    console.log(e);
    return response.status(500).json({ error: e.message });
  }

  if (!newUser) {
    return response
      .status(500)
      .json({ error: 'An error ocurred. Please try again!' });
  }
  return response.json(newUser);
});

usersRouter.put('/', async (request, response) => {
  if (!(await updateSchema.isValid(request.body))) {
    return response.status(400).json({ error: 'Validation fails' });
  }

  const { id, name, password, local_id, role_id, active } = request.body;

  const userToUpdate = {
    id,
    name,
    password,
    local_id,
    role_id,
    active,
  };

  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }

  const updateUser = new UpdateUserService();
  const updatedUser = await updateUser.execute(userToUpdate);

  if (!updatedUser) {
    return response
      .status(500)
      .json({ error: 'Something went wrong. Please try again' });
  }

  return response.json(updatedUser);
});

usersRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }
  const deleteUser = new DeleteUserService();
  await deleteUser.execute({ id });

  return response.status(204).send();
});

export default usersRouter;
