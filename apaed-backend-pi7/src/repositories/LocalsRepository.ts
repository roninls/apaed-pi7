import { EntityRepository, Repository } from 'typeorm';

import Local from '../models/Local';

@EntityRepository(Local)
class LocalsRepository extends Repository<Local> {}

export default LocalsRepository;
