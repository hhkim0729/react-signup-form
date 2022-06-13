import { User } from '../interface';

let users: User[] = [
  { email: 'hello@gmail.com', phone: '01012345678', username: 'hello' },
  { email: 'world@naver.com', phone: '020001111', username: 'world' },
  {
    email: 'heehkim@student.42seoul.kr',
    phone: '01009876543',
    username: 'heehkim',
  },
];

export function getUsers() {
  return users;
}

export function addUser(user: User) {
  users.concat(user);
}

export function isExist(key: string, value: string) {
  return users.find((user) => user[key] === value) ? true : false;
}
