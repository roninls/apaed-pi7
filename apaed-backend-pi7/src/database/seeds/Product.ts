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
  INSERT INTO PRODUCT(id, name, brand, ncm_id) 
  values ('${product1Id}', 'Arroz', 'Seara', '${product1NcmId}');
  `);

  await connection.query(`
  INSERT INTO PRODUCT(id, name, brand, ncm_id) 
  values ('${product2Id}', 'Feijao', 'Pretinho', '${product2NcmId}');
  `);

  await connection.query(`
  INSERT INTO PRODUCT(id, name, brand, ncm_id) 
  values ('${product3Id}', 'Camiseta Verde', 'Lacoste', '${product3NcmId}');
  `);

  await connection.query(`
  INSERT INTO PRODUCT(id, name, brand, ncm_id) 
  values ('${product4Id}', 'Short de corrida', 'Adidas', '${product4NcmId}');
  `);

  await connection.query(`
  INSERT INTO PRODUCT(id, name, brand, ncm_id) 
  values ('${product5Id}', 'Limpa vidros', 'Veja', '${product5NcmId}');
  `);

  await connection.query(`
  INSERT INTO PRODUCT(id, name, brand, ncm_id) 
  values ('${product6Id}', 'Arroz', 'Tio Joao', '${product6NcmId}');
  `);

  await connection.close();

  console.log('Products created!');
}
