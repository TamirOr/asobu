import { DataSource } from 'typeorm';
import { EventEntity } from './entities/event.entity';
import { GuestEntity } from './entities/guest.entity';
import { UserEntity } from './entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'secret',
  database: 'test',
  entities: [EventEntity, GuestEntity, UserEntity],
  synchronize: false,
  logging: false,
  migrations: ['src/migration/**/*.ts'],
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
