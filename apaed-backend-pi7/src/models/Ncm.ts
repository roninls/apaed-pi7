import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Type from './Type';
import UnityMeasurement from './UnityMeasurement';

@Entity('ncm')
class Ncm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  long_description: string;

  @Column()
  ncm_code: string;

  @Column()
  type_id: string;

  @Column('integer')
  minimal_more_products: number;

  @ManyToOne(() => Type, { eager: true })
  type: Type;

  @Column()
  unity_measurement_id: string;

  @ManyToOne(() => UnityMeasurement, { eager: true })
  unity_measurement: UnityMeasurement;

  @Column('decimal')
  minimal_qntt: number;

  @Column('boolean')
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Ncm;
