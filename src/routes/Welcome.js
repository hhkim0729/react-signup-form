import React from 'react';

const Welcome = ({ user }) => {
  return (
    <section>
      <h1>We're happy you're here, {user.username}!</h1>
    </section>
  );
};

export default Welcome;
