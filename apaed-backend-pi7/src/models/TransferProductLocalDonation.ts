import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import ProductLocalDonation from './ProductLocalDonation';
import Transfer from './Transfer';

@Entity('transfer_product_local_donation')
class TransferProductLocalDonation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  transfer_id: string;

  @Column()
  product_local_donation_id: string;

  @ManyToOne(() => ProductLocalDonation, { eager: true })
  product_local_donation: ProductLocalDonation;

  @ManyToOne(() => Transfer, { eager: true })
  transfer: Transfer;

  @Column('boolean')
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default TransferProductLocalDonation;
