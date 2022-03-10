import { createConnection } from 'typeorm';

export default async function create(
  unityMeasurement1Id: string,
  unityMeasurement2Id: string,
  unityMeasurement3Id: string,
  unityMeasurement4Id: string,
  unityMeasurement5Id: string,
): Promise<void> {
  const connection = await createConnection();

  await connection.query(`
      INSERT INTO UNITS_MEASURE(id, unity_measurement)
      values ('${unityMeasurement1Id}', 'KG');
  `);

  await connection.query(`
      INSERT INTO UNITS_MEASURE(id, unity_measurement)
      values ('${unityMeasurement2Id}', 'Caixas');
  `);

  await connection.query(`
      INSERT INTO UNITS_MEASURE(id, unity_measurement)
      values ('${unityMeasurement3Id}', 'Pacotes');
  `);

  await connection.query(`
      INSERT INTO UNITS_MEASURE(id, unity_measurement)
      values ('${unityMeasurement4Id}', 'Litros');
  `);

  await connection.query(`
      INSERT INTO UNITS_MEASURE(id, unity_measurement)
      values ('${unityMeasurement5Id}', 'Peças');
  `);

  await connection.close();

  console.log('Units Measure created!');
}
