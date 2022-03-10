import { createConnection } from 'typeorm';

export default async function create(
  productBazar1Id: string,
  productBazar2Id: string,
  product1Id: string,
  product2Id: string,
): Promise<void> {
  const connection = await createConnection();

  await connection.query(`
  INSERT INTO PRODUCT_BAZAR(id, product_id, price, sold) 
  values ('${productBazar1Id}', '${product1Id}', 100, false);
  `);

  await connection.query(`
      INSERT INTO PRODUCT_BAZAR(id, product_id, price, sold)
      values ('${productBazar2Id}', '${product2Id}', 59.99, true);
  `);

  await connection.close();

  console.log('Products Bazar created!');
}
