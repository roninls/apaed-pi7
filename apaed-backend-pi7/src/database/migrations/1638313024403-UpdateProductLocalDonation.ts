import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class UpdateProductLocalDonation1638313024403
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'product_local_donation',
      new TableColumn({
        name: 'food_stamp_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'product_local_donation',
      new TableForeignKey({
        name: 'ProductLocalDonationFoodStamp',
        columnNames: ['food_stamp_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'food_stamp',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'product_local_donation',
      'ProductLocalDonationFoodStamp',
    );
  }
}
