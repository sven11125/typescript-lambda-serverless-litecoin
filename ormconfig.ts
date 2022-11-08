import CONFIG from './config';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const baseConfig: MysqlConnectionOptions = {
  type: 'mysql',
  entities: ['db/entities/*.ts'],
  migrations: ['db/migration/*.ts'],
  cli: {
    migrationsDir: 'db/migration',
    entitiesDir: 'db/entities',
  },
};
module.exports = [
  {
    ...baseConfig,
    ...CONFIG.db.local,
  },
  {
    ...baseConfig,
    ...CONFIG.db.dev,
  }
];