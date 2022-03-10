import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateFoodStamp1638215341047
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'food_stamp',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'type',
            type: 'varchar',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'open',
            type: 'boolean',
            default: false,
          },
          // {
          //   name: 'product_local_donation_id',
          //   type: 'uuid',
          // },
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

    /* await queryRunner.createForeignKey(
      'food_stamp',
      new TableForeignKey({
        name: 'FoodStampProduct',
        columnNames: ['product_local_donation_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'product_local_donation',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    ); */
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.dropForeignKey('food_stamp', 'FoodStampProduct');

    await queryRunner.dropTable('food_stamp');
  }
}
