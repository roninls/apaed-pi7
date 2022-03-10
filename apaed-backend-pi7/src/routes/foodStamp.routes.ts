import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { validate } from 'uuid';
import { cadastroSchema, updateSchema } from '../schemas/foodStampSchema';
import FoodStampRepository from '../repositories/FoodStampRepository';
import CreateFoodStampService from '../services/FoodStamp/CreateFoodStampService';
import UpdateFoodStampService from '../services/FoodStamp/UpdateFoodStampService';
import DeleteFoodStampService from '../services/FoodStamp/DeleteFoodStampService';

const foodStampsRouter = Router();

foodStampsRouter.get('/', async (request, response) => {
  const foodStampRepository = getCustomRepository(FoodStampRepository);
  const { take = 10, skip = 0 } = request.query;

  const foodStamps = await foodStampRepository.findAndCount({
    // @ts-ignore
    where: {
      active: true,
      delivered: false,
    },
    take,
    skip,
  });

  return response.json(foodStamps);
});

foodStampsRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }
  const foodStampRepository = getCustomRepository(FoodStampRepository);
  const local = await foodStampRepository.findOne({
    where: { id, active: true },
  });

  if (!local) {
    return response.status(404).json({ error: 'FoodStamp does not exists' });
  }
  return response.json(local);
});

foodStampsRouter.post('/', async (request, response) => {
  if (!(await cadastroSchema.isValid(request.body))) {
    return response.status(400).json({ error: 'Validation fails' });
  }

  const { name, type, open, active, delivered } = request.body;
  const createFoodStamp = new CreateFoodStampService();

  let newFoodStamp;

  try {
    newFoodStamp = await createFoodStamp.execute({
      name,
      type,
      open,
      active,
      delivered,
    });
  } catch (e) {
    console.log(e);
    throw new Error();
  }

  if (!newFoodStamp) {
    return response
      .status(500)
      .json({ error: 'An error ocurred. Please try again!' });
  }
  return response.json(newFoodStamp);
});

foodStampsRouter.put('/', async (request, response) => {
  if (!(await updateSchema.isValid(request.body))) {
    return response.status(400).json({ error: 'Validation fails' });
  }

  const { name, id, type, open, active, delivered } = request.body;

  const foodStampToUpdate = {
    id,
    name,
    type,
    open,
    active,
    delivered,
  };

  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }

  const updateFoodStampService = new UpdateFoodStampService();
  const updatedFoodStamp = await updateFoodStampService.execute(
    foodStampToUpdate,
  );

  if (!updatedFoodStamp) {
    return response
      .status(500)
      .json({ error: 'Something went wrong. Please try again' });
  }

  return response.json(updatedFoodStamp);
});

foodStampsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }
  const deleteFoodStamp = new DeleteFoodStampService();
  await deleteFoodStamp.execute({ id });

  return response.status(204).send();
});

export default foodStampsRouter;
