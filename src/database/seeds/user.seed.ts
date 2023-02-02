import * as moment from 'moment';

export const UserSeed = [
  {
    username: 'admin',
    password: '$2a$12$DcaoImQqhqiilPIImTNfO.N6lyay5BZRoypDjqMt1NhEXVygm3SnO',
    email: 'domagoj.ppp1@gmail.com',
    role: 3,
    verifiedDate: moment(),
  },
  {
    username: 'verUser',
    password: '$2a$12$DcaoImQqhqiilPIImTNfO.N6lyay5BZRoypDjqMt1NhEXVygm3SnO',
    email: 'domagoj.ppp2@gmail.com',
    role: 2,
    verifiedDate: moment(),
  },
  {
    username: 'regVerUsr',
    password: '$2a$12$DcaoImQqhqiilPIImTNfO.N6lyay5BZRoypDjqMt1NhEXVygm3SnO',
    email: 'domagoj.ppp3@gmail.com',
  },
];
