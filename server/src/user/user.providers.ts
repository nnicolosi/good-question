import { User } from './user.entity';
import { Connection } from 'typeorm';
import { DATABASE_CONNECTION, USER_REPOSITORY } from '../common/constants';

export const userProviders = [
  {
    provide: USER_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: [DATABASE_CONNECTION],
  },
];
