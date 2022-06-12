import React, { useState, useCallback } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Main from './routes/Main';
import Signup from './routes/Signup';
import Welcome from './routes/Welcome';
import Error from './routes/Error';
import { User } from './interface';
import './Home.css';

const Home = () => {
  const [user, setUser] = useState({
    email: '',
    phone: '',
    username: '',
  });

  const setLoginUser = useCallback(({ email, phone, username }: User) => {
    const newUser: User = {
      email: email,
      phone: phone,
      username: username,
    };
    setUser(newUser);
  }, []);

  return (
    <div className="Home">
      <header className="Home__header">
        <div className="Home__title">
          <Link to="/">The Coolest Website</Link>
        </div>
      </header>
      <main className="Home__main">
        <Routes>
          <Route path="/" element={<Main user={user} />} />
          <Route
            path="signup"
            element={<Signup setLoginUser={setLoginUser} />}
          />
          <Route path="welcome" element={<Welcome user={user} />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </main>
    </div>
  );
};

export default Home;
