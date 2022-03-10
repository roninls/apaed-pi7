import { EntityRepository, Repository } from 'typeorm';

import Ncm from '../models/Ncm';

@EntityRepository(Ncm)
class NcmRepository extends Repository<Ncm> {}

export default NcmRepository;
