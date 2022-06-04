import React from 'react';
import { Link } from 'react-router-dom';
import { UserProps } from '../interface';

interface MainProps {
  user: UserProps;
}

function Main({ user }: MainProps) {
  return (
    <section>
      <h1>Thank you for visiting! {user.username}</h1>
      <Link to="signup">Be my guest</Link>
    </section>
  );
}

export default Main;
