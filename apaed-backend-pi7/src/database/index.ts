import { createConnection } from 'typeorm';

createConnection()
  .then(() => console.log('Connected to database!'))
  .catch(() => console.log('Error connecting to database!'));
