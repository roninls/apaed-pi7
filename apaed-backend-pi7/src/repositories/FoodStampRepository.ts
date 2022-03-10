import { EntityRepository, Repository } from 'typeorm';
import FoodStamp from '../models/FoodStamp';

@EntityRepository(FoodStamp)
class FoodStampRepository extends Repository<FoodStamp> {}

export default FoodStampRepository;
