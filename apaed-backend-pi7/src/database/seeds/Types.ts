import { createConnection } from 'typeorm';

export default async function create(
  type1Id: string,
  type2Id: string,
  type3Id: string,
): Promise<void> {
  const connection = await createConnection();

  await connection.query(`
  INSERT INTO TYPES(id, type) 
  values ('${type1Id}', 'Alimento');
  `);

  await connection.query(`
  INSERT INTO TYPES(id, type) 
  values ('${type2Id}', 'Roupa');
  `);

  await connection.query(`
  INSERT INTO TYPES(id, type) 
  values ('${type3Id}', 'Produto de Limpeza');
  `);

  await connection.close();

  console.log('Types created!');
}
