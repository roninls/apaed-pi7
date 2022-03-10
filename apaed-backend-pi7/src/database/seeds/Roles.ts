import { createConnection } from 'typeorm';

export default async function create(
  adminId: string,
  userId: string,
): Promise<void> {
  const connection = await createConnection();

  await connection.query(`
  INSERT INTO ROLES(id, name) values ('${adminId}', 'ROLE_ADMIN');
  `);

  await connection.query(`
  INSERT INTO ROLES(id, name) values ('${userId}', 'ROLE_USER');
  `);

  await connection.close();

  console.log('Roles created!');
}
