import { createConnection } from 'typeorm';

export default async function create(
  contact1Id: string,
  contact2Id: string,
): Promise<void> {
  const connection = await createConnection();

  await connection.query(`
      INSERT INTO CONTACTS(id, public_place, complement, number, district, city, state, country, zip_code, phone)
      values ('${contact1Id}', 'Quadra 106', 'lote 3', '0', 'Aguas Claras', 'Brasilia', 'DF', 'Brasil', '71915500', '61981384751');
  `);

  await connection.query(`
      INSERT INTO CONTACTS(id, public_place, complement, number, district, city, state, country, zip_code, phone)
      values ('${contact2Id}', 'Quadra 203', 'lote 4', '4', 'Aguas Claras', 'Brasilia', 'DF', 'Brasil', '71939360', '61999960510');
  `);

  await connection.close();

  console.log('Contacts created!');
}
