import { EntityRepository, Repository } from 'typeorm';

import TransferProductLocalDonation from '../models/TransferProductLocalDonation';

@EntityRepository(TransferProductLocalDonation)
class TransferProductLocalDonationRepository extends Repository<TransferProductLocalDonation> {}

export default TransferProductLocalDonationRepository;
