import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateProductLocalDonation1630440914508
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'product_local_donation',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'expiration_date',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'donation_id',
            type: 'uuid',
          },
          {
            name: 'local_id',
            type: 'uuid',
          },
          {
            name: 'product_id',
            type: 'uuid',
          },
          {
            name: 'valor_product',
            type: 'numeric',
            isNullable: true,
          },
          {
            name: 'ncm_id',
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
      'product_local_donation',
      new TableForeignKey({
        name: 'ProductLocalDonationDonation',
        columnNames: ['donation_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'donations',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'product_local_donation',
      new TableForeignKey({
        name: 'ProductLocalDonationLocal',
        columnNames: ['local_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'locals',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'product_local_donation',
      new TableForeignKey({
        name: 'ProductLocalDonationProduct',
        columnNames: ['product_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'product',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'product_local_donation',
      'ProductLocalDonationDonation',
    );

    await queryRunner.dropForeignKey(
      'product_local_donation',
      'ProductLocalDonationLocal',
    );

    await queryRunner.dropForeignKey(
      'product_local_donation',
      'ProductLocalDonationProduct',
    );
    await queryRunner.dropTable('product_local_donation');
  }
}
