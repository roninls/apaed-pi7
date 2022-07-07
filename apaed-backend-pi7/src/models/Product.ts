import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Ncm from './Ncm';

@Entity('product')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column()
  ncm_id: string;

  @Column('numeric')
  valor_product: number;

  @ManyToOne(() => Ncm, { eager: true })
  ncm: Ncm;

  @Column('boolean')
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Product;
