import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import ColumnNumericTransformer from '../config/ColumnNumericTransformer';
import Product from './Product';

@Entity('product_bazar')
class ProductBazar {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  product_id: string;

  @Column('numeric', {
    precision: 7,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  price: number;

  @Column('boolean')
  sold: boolean;

  @Column('date')
  sold_at: Date;

  @ManyToOne(() => Product, { eager: true })
  product: Product;

  @Column('boolean')
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ProductBazar;
