import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { number } from 'yup';
import Donation from './Donation';
import FoodStamp from './FoodStamp';
import Local from './Local';
import Product from './Product';

@Entity('product_local_donation')
class ProductLocalDonation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('date')
  expiration_date: Date;

  @Column()
  donation_id: string;

  @ManyToOne(() => Donation, { eager: true })
  donation: Donation;

  @Column()
  local_id: string;

  @Column()
  ncm_id: string;

  @ManyToOne(() => Local, { eager: true })
  local: Local;

  @Column('numeric')
  valor_product: number;
  
  @Column()
  product_id: string;

  @ManyToOne(() => Product, { eager: true })
  product: Product;

  @Column()
  food_stamp_id: string;

  @ManyToOne(() => FoodStamp, { eager: true })
  food_stamp: FoodStamp;

  @Column('boolean')
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ProductLocalDonation;
