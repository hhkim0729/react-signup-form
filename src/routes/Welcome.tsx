import React, { memo } from 'react';
import Error from './Error';
import { User } from '../interface';
import './Welcome.css';

interface WelcomeProps {
  user: User;
}

const Welcome = memo(({ user }: WelcomeProps) => {
  return user.username ? (
    <section className="Welcome">
      <h1 className="Welcome__msg">
        We're happy you're here, {user.username}!
      </h1>
    </section>
  ) : (
    <Error />
  );
});

export default Welcome;
