import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateNcm1630440634444 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ncm',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'long_description',
            type: 'varchar',
          },
          {
            name: 'minimal_qntt',
            type: 'decimal',
          },
          {
            name: 'minimal_more_products',
            type: 'integer',
          },
          {
            name: 'ncm_code',
            type: 'varchar',
          },
          {
            name: 'type_id',
            type: 'uuid',
          },
          {
            name: 'unity_measurement_id',
            type: 'uuid',
          },
          {
            name: 'active',
            type: 'boolean',
            default: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'ncm',
      new TableForeignKey({
        name: 'NcmType',
        columnNames: ['type_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'types',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'ncm',
      new TableForeignKey({
        name: 'NcmUnityMeasurement',
        columnNames: ['unity_measurement_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'units_measure',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('ncm', 'NcmType');

    await queryRunner.dropForeignKey('ncm', 'NcmUnityMeasurement');

    await queryRunner.dropTable('ncm');
  }
}
