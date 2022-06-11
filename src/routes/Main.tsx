import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { UserProps } from '../interface';
import './Main.css';

interface MainProps {
  user: UserProps;
}

const Main = memo(({ user }: MainProps) => {
  return (
    <section className="Main">
      <h1 className="Main__greeting">
        Thank you for visiting{user.username && `, ${user.username}`}!
      </h1>
      {!user.username && (
        <div className="Main__link">
          <Link to="signup">Be my guest</Link>
        </div>
      )}
    </section>
  );
});

export default Main;
