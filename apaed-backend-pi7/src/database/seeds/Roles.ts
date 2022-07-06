import { createConnection } from 'typeorm';

export default async function create(
  adminId: string,
  userId: string,
  bazarId: string,
): Promise<void> {
  const connection = await createConnection();

  await connection.query(`
  INSERT INTO ROLES(id, name) values ('${adminId}', 'ROLE_ADMIN');
  `);

  await connection.query(`
  INSERT INTO ROLES(id, name) values ('${userId}', 'ROLE_USER');
  `);
  
  await connection.query(`
  INSERT INTO ROLES(id, name) values ('${bazarId}', 'ROLE_BAZAR');
  `);

  await connection.close();

  console.log('Roles created!');
}
