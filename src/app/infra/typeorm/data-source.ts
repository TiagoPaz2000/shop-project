import 'reflect-metadata';
import { DataSource } from 'typeorm';
import User from './entity/User';
import { migrations1655858094031 } from './migrations/1655858094031-migrations';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'root',
    password: 'docker',
    database: 'porquinho',
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

// export AppDataSource;