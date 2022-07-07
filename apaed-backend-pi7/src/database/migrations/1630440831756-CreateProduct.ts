import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateProduct1630440831756 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'product',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'brand',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'ncm_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'valor_product',
            type: 'numeric',
            isNullable: true,
          },
          {
            name: 'active',
            type: 'boolean',
            isNullable: false,
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
      'product',
      new TableForeignKey({
        name: 'ProductNcm',
        columnNames: ['ncm_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'ncm',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('product', 'ProductNcm');

    await queryRunner.dropTable('product');
  }
}
