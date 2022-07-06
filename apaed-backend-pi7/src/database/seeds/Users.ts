import { createConnection } from 'typeorm';

export default async function create(
  adminId: string,
  userId: string,
  bazarId: string,
  localAdminId: string,
  localUserId: string,
  localBazarId: string,
  roleAdminId: string,
  roleUserId: string,
  roleBazarId: string,
): Promise<void> {
  const connection = await createConnection();

  await connection.query(`
  INSERT INTO USERS(id, name, password, local_id, role_id) 
  values ('${adminId}', 'admin', '$2a$08$7yfof/vlcM8t3mPy32Iptucskr2moWw/lBmX6i4ThXje6HFltv9mq', '${localAdminId}', '${roleAdminId}');
  `);

  await connection.query(`
      INSERT INTO USERS(id, name, password, local_id, role_id)
      values ('${userId}', 'user', '$2a$08$9sbH1l37nv6HqpPnHUHPD.140bTE9ATz7/Iogb5p7WgFCkF.CJ2bq', '${localUserId}', '${roleUserId}');
  `);
  
  await connection.query(`
      INSERT INTO USERS(id, name, password, local_id, role_id)
      values ('${bazarId}', 'teste', '$2a$10$QVTBII3j5U/RwGArk.FjkO7p/45I2LiaVnMqlNc79NtTkGW38XuU2', '${localBazarId}', '${roleBazarId}');
  `);

  await connection.close();

  console.log('Users created!');
}
