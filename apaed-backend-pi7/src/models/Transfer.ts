import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Local from './Local';

@Entity('transfer')
class Transfer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column('date')
  transfer_date: Date;

  @Column()
  origin_id: string;

  @ManyToOne(() => Local, { eager: true })
  origin: Local;

  @Column()
  destiny_id: string;

  @ManyToOne(() => Local, { eager: true })
  destiny: Local;

  @Column()
  product_name: string;

  @Column()
  product_brand: string;

  @Column()
  product_ncm_code: string;

  @Column()
  total_amount_transfered: number;

  @Column('boolean')
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Transfer;
