import 'reflect-metadata';
import { DataSource } from 'typeorm';
import User from './entity/User';
import { migrations1655858094031 } from './migrations/1655858094031-migrations';
import 'dotenv/config';

const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASS,
  DB_NAME,
} = process.env;

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: DB_HOST || 'localhost',
    port: Number(DB_PORT) || 5432,
    username: DB_USER || 'root',
    password: DB_PASS || 'docker',
    database: DB_NAME || 'porquinho',
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [migrations1655858094031],
    subscribers: [],
});


AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
    })
    .catch((err) => {
        console.error('Error during Data Source initialization', err);
    });
