import { createConnection } from 'typeorm';

export default async function create(
  donor1Id: string,
  donor2Id: string,
  donor1ContactId: string,
  donor2ContactId: string,
): Promise<void> {
  const connection = await createConnection();

  await connection.query(`
  INSERT INTO DONORS(id, name, contact_id, document, email) 
  values ('${donor1Id}', 'Ronin', '${donor1ContactId}', '20771', 'ronindiiniiz@gmail.com');
  `);
  
  // await connection.query(`
  // INSERT INTO DONORS(id, name, contact_id, document, email) 
  // values ('${donor1Id}', 'Victor', '${donor1ContactId}', '04487251184', 'victoralcan@gmail.com');
  // `);

  await connection.query(`
      INSERT INTO DONORS(id, name, contact_id, document, email)
      values ('${donor2Id}', 'Lucas', '${donor2ContactId}', '53929764172', 'lucas@gmail.com');
  `);

  await connection.close();

  console.log('Donors created!');
}
