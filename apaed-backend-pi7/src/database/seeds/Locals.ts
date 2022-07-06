import { createConnection } from 'typeorm';

export default async function create(
  local1Id: string,
  local2Id: string,
  local3Id: string,
  local4Id: string,
  contactLocal1Id: string,
  contactLocal2Id: string,
  contactLocal3Id: string,
  contactLocal4Id: string,
): Promise<void> {
  const connection = await createConnection();

  await connection.query(`
      INSERT INTO LOCALS(id, name, contact_id, document)
      values ('${local1Id}', 'Estoque', '${contactLocal1Id}', '04487251184');
  `);

  await connection.query(`
      INSERT INTO LOCALS(id, name, contact_id, document)
      values ('${local2Id}', 'Casa Carinho', '${contactLocal2Id}', '12345678900');
  `);

  await connection.query(`
      INSERT INTO LOCALS(id, name, contact_id, document)
      values ('${local3Id}', 'Instituto Bezerra de Menezes', '${contactLocal3Id}', '00987654321');
  `);
  
  await connection.query(`
      INSERT INTO LOCALS(id, name, contact_id, document)
      values ('${local4Id}', 'Bazar', '${contactLocal4Id}', '12345678912');
  `);

  await connection.close();

  console.log('Locals created!');
}
