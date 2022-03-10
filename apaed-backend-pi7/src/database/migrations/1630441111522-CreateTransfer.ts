import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateTransfer1630441111522 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'transfer',
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
            name: 'transfer_date',
            type: 'date',
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'origin_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'destiny_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'product_name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'product_brand',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'product_ncm_code',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'total_amount_transfered',
            type: 'integer',
            isNullable: false,
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
      'transfer',
      new TableForeignKey({
        name: 'TransferOrigin',
        columnNames: ['origin_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'locals',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'transfer',
      new TableForeignKey({
        name: 'TransferDestiny',
        columnNames: ['destiny_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'locals',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('transfer', 'TransferOrigin');

    await queryRunner.dropForeignKey('transfer', 'TransferDestiny');

    await queryRunner.dropTable('transfer');
  }
}
