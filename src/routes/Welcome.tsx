import React from 'react';
import Error from './Error';
import { UserProps } from '../interface';

interface WelcomeProps {
  user: UserProps;
}

const Welcome = ({ user }: WelcomeProps) => {
  return user.username ? (
    <section>
      <h1>We're happy you're here, {user.username}!</h1>
    </section>
  ) : (
    <Error />
  );
};

export default Welcome;
