import { DataSource } from 'typeorm';
import { Role } from '../roles/entities/role.entity';
import { Token } from '../tokens/entities/token.entity';
import { User } from '../users/entities/user.entity';
import { UserSubscriber } from './subscribers/user.subscriber';
import { seed1673393951184 } from './migrations/1673393951184-seed';

export const databaseConfig: DataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST?.trim() || '127.0.0.1',
  port: Number(process.env.DB_PORT?.trim()) || 5432,
  username: process.env.DB_USERNAME?.trim() || 'postgres',
  database: process.env.DB_DATABASE?.trim() || 'postgres',
  password: process.env.DB_PASSWORD?.trim() || 'postgres',
  //schema: process.env.DB_SCHEMA || 'public',
  //dropSchema: process.env.NODE_ENV?.trim() == 'development' ? true : false,
  //synchronize: process.env.NODE_ENV?.trim() == 'development' ? true : false,
  //migrationsRun: process.env.NODE_ENV?.trim() === 'development' ? true : false,
  entities: [User, Role, Token],
  subscribers: [UserSubscriber],
  migrations: [seed1673393951184],
  logger: 'advanced-console',
  poolSize: 15,
  logging: process.env.NODE_ENV?.trim() === 'development' ? true : false,
});
