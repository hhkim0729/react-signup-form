import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { User } from '../interface';
import './Main.css';

interface MainProps {
  user: User;
}

const Main = memo(({ user }: MainProps) => {
  return (
    <section className="Main">
      <h1 className="message">
        Thank you for visiting{user.username && `, ${user.username}`}!
      </h1>
      {!user.username && (
        <div className="Main__link button">
          <Link to="signup">Be my guest</Link>
        </div>
      )}
    </section>
  );
});

export default Main;
