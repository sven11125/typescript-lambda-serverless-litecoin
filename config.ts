import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const region = process.env.AWS_REGION;
const stage = process.env.STAGE;
export const isProductionMode = stage === 'production';
const namingStrategy = new SnakeNamingStrategy();

export default {
  isLocal: process.env.IS_OFFLINE && process.env.IS_OFFLINE === 'true',
  accessKeyId: "",
  secretAccessKey: "",
  region,
  stage,
  db: {
    local: {
      name: 'dev',
      host: 'db.kuky.com',
      port: 3306,
      username: '',
      password: '',
      database: 'kukylite',
      synchronize: false,
      logging: true,
      namingStrategy,
    },
    dev: {
      name: 'dev',
      host: 'db.kuky.com',
      port: 3306,
      username: '',
      password: '',
      database: 'kukylite',
      synchronize: false,
      logging: true,
      namingStrategy,
    },
  },
  tables: {
    users: 'users',
    user_wallet: 'user_wallet',
    app_setting: 'app_setting'
  },
  s3: {
    BUCKET: process.env.S3_BUCKET_NAME,
  }
};
