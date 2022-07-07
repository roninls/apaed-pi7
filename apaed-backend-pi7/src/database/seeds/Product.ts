import { createConnection } from 'typeorm';

export default async function create(
  product1Id: string,
  product2Id: string,
  product3Id: string,
  product4Id: string,
  product5Id: string,
  product6Id: string,
  product1NcmId: string,
  product2NcmId: string,
  product3NcmId: string,
  product4NcmId: string,
  product5NcmId: string,
  product6NcmId: string,
): Promise<void> {
  const connection = await createConnection();

  await connection.query(`
  INSERT INTO PRODUCT(id, name, brand, ncm_id, valor_product) 
  values ('${product1Id}', 'Arroz', 'Seara', '${product1NcmId}', 100);
  `);

  await connection.query(`
  INSERT INTO PRODUCT(id, name, brand, ncm_id, valor_product) 
  values ('${product2Id}', 'Feijao', 'Pretinho', '${product2NcmId}', 100);
  `);

  await connection.query(`
  INSERT INTO PRODUCT(id, name, brand, ncm_id, valor_product) 
  values ('${product3Id}', 'Camiseta Verde', 'Lacoste', '${product3NcmId}', 100);
  `);

  await connection.query(`
  INSERT INTO PRODUCT(id, name, brand, ncm_id, valor_product) 
  values ('${product4Id}', 'Short de corrida', 'Adidas', '${product4NcmId}', 100);
  `);

  await connection.query(`
  INSERT INTO PRODUCT(id, name, brand, ncm_id, valor_product) 
  values ('${product5Id}', 'Limpa vidros', 'Veja', '${product5NcmId}', 100);
  `);

  await connection.query(`
  INSERT INTO PRODUCT(id, name, brand, ncm_id, valor_product) 
  values ('${product6Id}', 'Arroz', 'Tio Joao', '${product6NcmId}', 100);
  `);

  await connection.close();

  console.log('Products created!');
}
