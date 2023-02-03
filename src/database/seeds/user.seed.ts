import * as moment from 'moment';

export const UserSeed = [
  {
    username: 'admin',
    password: 'password',
    email: 'domagoj.ppp1@gmail.com',
    role: 3,
    verifiedDate: moment(),
  },
  {
    username: 'verUser',
    password: 'password',
    email: 'domagoj.ppp2@gmail.com',
    role: 2,
    verifiedDate: moment(),
  },
  {
    username: 'regUser',
    password: 'password',
    email: 'domagoj.ppp3@gmail.com',
  },
];
