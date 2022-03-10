import { EntityRepository, Repository } from 'typeorm';

import Type from '../models/Type';

@EntityRepository(Type)
class TypesRepository extends Repository<Type> {}

export default TypesRepository;
