import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class UpdateFoodStamp1639447074469
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'food_stamp',
      new TableColumn({
        name: 'delivered',
        type: 'boolean',
        default: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('food_stamp', 'delivered');
  }
}
