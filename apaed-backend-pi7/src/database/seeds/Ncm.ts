import { createConnection } from 'typeorm';

export default async function create(
  ncm1Id: string,
  ncm2Id: string,
  ncm3Id: string,
  ncm4Id: string,
  ncm5Id: string,
  ncm1TypeId: string,
  ncm2TypeId: string,
  ncm3TypeId: string,
  ncm4TypeId: string,
  ncm5TypeId: string,
  ncm1unityMeasurementId: string,
  ncm2unityMeasurementId: string,
  ncm3unityMeasurementId: string,
  ncm4unityMeasurementId: string,
  ncm5unityMeasurementId: string,
): Promise<void> {
  const connection = await createConnection();

  await connection.query(`
  INSERT INTO NCM(id, description, long_description, minimal_qntt, ncm_code, type_id, unity_measurement_id, minimal_more_products) 
  values ('${ncm1Id}', 'Arroz Polido/Brunido não Parboilizado', 'É o mais comum entre os demais, também chamado de arroz branco ou tradicional', 
          '100', '1006.30.21', '${ncm1TypeId}', '${ncm1unityMeasurementId}', 30);
  `);

  await connection.query(`
  INSERT INTO NCM(id, description, long_description, minimal_qntt, ncm_code, type_id, unity_measurement_id, minimal_more_products) 
  values ('${ncm2Id}', 'Feijão', 'Feijão comum', '200', '071333', '${ncm2TypeId}', '${ncm2unityMeasurementId}', 30);
  `);

  await connection.query(`
  INSERT INTO NCM(id, description, long_description, minimal_qntt, ncm_code, type_id, unity_measurement_id, minimal_more_products) 
  values ('${ncm3Id}', 'Camisa de malha, masculina', 'Camisas de malha, de uso masculino', '10', '6105', '${ncm3TypeId}', '${ncm3unityMeasurementId}', 50);
  `);

  await connection.query(`
  INSERT INTO NCM(id, description, long_description, minimal_qntt, ncm_code, type_id, unity_measurement_id, minimal_more_products) 
  values ('${ncm4Id}', 'Limpa Vidros Borrifador Veja', 'Limpa Vidro Borrifador VEJA 500ML BIO ÁLCOOL UNIT', 
          '10', '34022000', '${ncm4TypeId}', '${ncm4unityMeasurementId}', 10);
  `);

  await connection.query(`
  INSERT INTO NCM(id, description, long_description, minimal_qntt, ncm_code, type_id, unity_measurement_id, minimal_more_products) 
  values ('${ncm5Id}', 'Short', 'Vestuário e seus acessórios, exceto de malha. Calças, jardineiras, bermudas e shorts (calções):', 
          '5', '6204.6', '${ncm5TypeId}', '${ncm5unityMeasurementId}', 20);
  `);

  await connection.close();

  console.log('Ncm created!');
}
