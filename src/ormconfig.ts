import { DataSourceOptions } from 'typeorm';
import 'dotenv/config';

const typeOrmExtra =
  process.env.NODE_ENV === 'development'
    ? null
    : {
        ssl: {
          rejectUnauthorized: true,
        },
      };

const config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  synchronize: false,
  migrationsRun: true,
  extra: typeOrmExtra,
};

export = config;
