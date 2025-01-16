/* eslint-disable prettier/prettier */
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';

const isProduction = process.env.NODE_ENV === 'production';

const entitiesPath = isProduction
  ? __dirname + '/../typeorm/entities/*.entity.js'
  : __dirname + '/../**/*.entity{.ts,.js}'; 

console.log('Entities Path:', entitiesPath);

export const AppDataSource = new DataSource({
  type: process.env.DATABASE_TYPE,
  url: process.env.DATABASE_URL,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT
    ? parseInt(process.env.DATABASE_PORT, 10)
    : 3306,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
  dropSchema: false,
  keepConnectionAlive: true,
  logging: true,
  connectTimeout: 30000,
  entities: [entitiesPath],
} as DataSourceOptions);

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
