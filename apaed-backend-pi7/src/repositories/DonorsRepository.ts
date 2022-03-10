import { EntityRepository, Repository } from 'typeorm';

import Donor from '../models/Donor';

@EntityRepository(Donor)
class DonorsRepository extends Repository<Donor> {}

export default DonorsRepository;
