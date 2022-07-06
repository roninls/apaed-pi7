import { createConnection } from 'typeorm';

export default async function create(
  productLocalDonation1Id: string,
  productLocalDonation2Id: string,
  productLocalDonation3Id: string,
  productLocalDonation4Id: string,
  productLocalDonation5Id: string,
  productLocalDonation6Id: string,
  productLocalDonation1DonationId: string,
  productLocalDonation2DonationId: string,
  productLocalDonation3DonationId: string,
  productLocalDonation4DonationId: string,
  productLocalDonation5DonationId: string,
  productLocalDonation6DonationId: string,
  productLocalDonation1LocalId: string,
  productLocalDonation2LocalId: string,
  productLocalDonation3LocalId: string,
  productLocalDonation4LocalId: string,
  productLocalDonation5LocalId: string,
  productLocalDonation6LocalId: string,
  productLocalDonation1ProductId: string,
  productLocalDonation2ProductId: string,
  productLocalDonation3ProductId: string,
  productLocalDonation4ProductId: string,
  productLocalDonation5ProductId: string,
  productLocalDonation6ProductId: string,
  productLocalDonation1NcmId: string,
  productLocalDonation2NcmId: string,
  productLocalDonation3NcmId: string,
  productLocalDonation4NcmId: string,
  productLocalDonation5NcmId: string,
  productLocalDonation6NcmId: string,
  foodStamp1Id: string,
): Promise<void> {
  const connection = await createConnection();

  await connection.query(`
  INSERT INTO PRODUCT_LOCAL_DONATION(id, donation_id, local_id, product_id, expiration_date, ncm_id, food_stamp_id, valor_product) 
  values ('${productLocalDonation1Id}', '${productLocalDonation1DonationId}','${productLocalDonation1LocalId}', 
          '${productLocalDonation1ProductId}', 'now()', '${productLocalDonation1NcmId}', '${foodStamp1Id}', 100);
  `);

  await connection.query(`
  INSERT INTO PRODUCT_LOCAL_DONATION(id, donation_id, local_id, product_id, expiration_date, ncm_id, food_stamp_id, valor_product) 
  values ('${productLocalDonation2Id}', '${productLocalDonation2DonationId}','${productLocalDonation2LocalId}', 
          '${productLocalDonation2ProductId}', 'now()', '${productLocalDonation2NcmId}', '${foodStamp1Id}', 100);
  `);

  await connection.query(`
  INSERT INTO PRODUCT_LOCAL_DONATION(id, donation_id, local_id, product_id, expiration_date, ncm_id, food_stamp_id, valor_product) 
  values ('${productLocalDonation3Id}', '${productLocalDonation3DonationId}','${productLocalDonation3LocalId}', 
          '${productLocalDonation3ProductId}', 'now()', '${productLocalDonation3NcmId}', '${foodStamp1Id}', 100);
  `);

  await connection.query(`
  INSERT INTO PRODUCT_LOCAL_DONATION(id, donation_id, local_id, product_id, ncm_id, food_stamp_id, valor_product) 
  values ('${productLocalDonation4Id}', '${productLocalDonation4DonationId}','${productLocalDonation4LocalId}',
          '${productLocalDonation4ProductId}', '${productLocalDonation4NcmId}', '${foodStamp1Id}', 100);
  `);

  await connection.query(`
  INSERT INTO PRODUCT_LOCAL_DONATION(id, donation_id, local_id, product_id, expiration_date, ncm_id, food_stamp_id, valor_product) 
  values ('${productLocalDonation5Id}', '${productLocalDonation5DonationId}','${productLocalDonation5LocalId}',
          '${productLocalDonation5ProductId}', 'now()', '${productLocalDonation5NcmId}', '${foodStamp1Id}', 100);
  `);

  await connection.query(`
  INSERT INTO PRODUCT_LOCAL_DONATION(id, donation_id, local_id, product_id, ncm_id, valor_product) 
  values ('${productLocalDonation6Id}', '${productLocalDonation6DonationId}','${productLocalDonation6LocalId}', 
          '${productLocalDonation6ProductId}', '${productLocalDonation6NcmId}', 100);
  `);

  await connection.close();

  console.log('Product Local Donation created!');
}
