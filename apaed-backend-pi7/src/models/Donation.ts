import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Donor from './Donor';
import ProductLocalDonation from './ProductLocalDonation';

@Entity('donations')
class Donation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @Column('date')
  donation_date: Date;

  @Column()
  donor_id: string;

  @ManyToOne(() => Donor, { eager: true })
  donor: Donor;

  @OneToMany(
    () => ProductLocalDonation,
    productLocalDonation => productLocalDonation.donation,
  )
  productLocalDonation: ProductLocalDonation[];

  @Column('boolean')
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Donation;
