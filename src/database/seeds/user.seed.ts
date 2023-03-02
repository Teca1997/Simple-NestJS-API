import * as moment from 'moment';

export const UserSeed = [
  {
    username: 'admin',
    password: 'password',
    email: 'test1@gmail.com',
    role: 3,
    verifiedDate: moment(),
  },
  {
    username: 'verUser',
    password: 'password',
    email: 'test2@gmail.com',
    role: 2,
    verifiedDate: moment(),
  },
  {
    username: 'regUser',
    password: 'password',
    email: 'test3@gmail.com',
  },
];
