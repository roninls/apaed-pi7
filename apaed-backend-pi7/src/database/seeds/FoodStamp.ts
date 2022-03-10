import { createConnection } from 'typeorm';

export default async function create(
  foodStamp1Id: string,
  // product_local_donation_id: string,
): Promise<void> {
  const connection = await createConnection();

  await connection.query(`
  INSERT INTO FOOD_STAMP(id, name, type, open, delivered)
  values ('${foodStamp1Id}', 'Cesta 1', 'Completa', true, false);
  `);

  await connection.close();

  console.log('FoodStamp created!');
}
