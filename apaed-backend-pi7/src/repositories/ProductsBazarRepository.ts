import { EntityRepository, Repository } from 'typeorm';
import ProductBazar from '../models/ProductBazar';

@EntityRepository(ProductBazar)
class ProductsBazarRepository extends Repository<ProductBazar> {}

export default ProductsBazarRepository;
