import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('units_measure')
class UnityMeasurement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  unity_measurement: string;

  @Column('boolean')
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UnityMeasurement;
