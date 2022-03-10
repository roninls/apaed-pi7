import { createConnection } from 'typeorm';

export default async function create(
  donation1Id: string,
  donation2Id: string,
  donation1DonorId: string,
  donation2DonorId: string,
): Promise<void> {
  const connection = await createConnection();

  await connection.query(`
      INSERT INTO DONATIONS(id, donor_id, type)
      values ('${donation1Id}', '${donation1DonorId}', 'Doação');
  `);

  await connection.query(`
      INSERT INTO DONATIONS(id, donor_id, type)
      values ('${donation2Id}', '${donation2DonorId}', 'Doação');
  `);

  await connection.close();

  console.log('Donations created!');
}
