import React from 'react';
import { Link } from 'react-router-dom';

function Main() {
  return (
    <section>
      <h1>Thank you for visiting!</h1>
      <Link to="signup">Be my guest</Link>
    </section>
  );
}

export default Main;
