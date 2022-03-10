import { EntityRepository, Repository } from 'typeorm';

import Donation from '../models/Donation';

@EntityRepository(Donation)
class DonationsRepository extends Repository<Donation> {}

export default DonationsRepository;
