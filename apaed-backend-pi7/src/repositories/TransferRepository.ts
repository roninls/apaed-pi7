import { EntityRepository, Repository } from 'typeorm';

import Transfer from '../models/Transfer';

@EntityRepository(Transfer)
class TransferRepository extends Repository<Transfer> {}

export default TransferRepository;
