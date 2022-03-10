import { EntityRepository, Repository } from 'typeorm';

import ProductLocalDonation from '../models/ProductLocalDonation';

@EntityRepository(ProductLocalDonation)
class ProductLocalDonationRepository extends Repository<ProductLocalDonation> {}

export default ProductLocalDonationRepository;
