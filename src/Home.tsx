import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Main from './routes/Main';
import Signup from './routes/Signup';
import Welcome from './routes/Welcome';
import Error from './routes/Error';
import { UserProps, InfosProps } from './interface';

const Home = () => {
  const [users, setUsers] = useState([
    { email: 'hello@gmail.com', phone: '01012345678', username: 'hello' },
    { email: 'world@naver.com', phone: '020001111', username: 'world' },
    {
      email: 'heehkim@student.42seoul.kr',
      phone: '01009876543',
      username: 'heehkim',
    },
  ]);
  const [user, setUser] = useState({
    email: '',
    phone: '',
    username: '',
  });

  const addUser = ({ email, phone, username }: InfosProps) => {
    setUsers((prev) =>
      prev.concat({
        email: email,
        phone: phone,
        username: username,
      })
    );
  };

  const setLoginUser = ({ email, phone, username }: InfosProps) => {
    const newUser: UserProps = {
      email: email,
      phone: phone,
      username: username,
    };
    setUser(newUser);
  };

  return (
    <div>
      <header>
        <div>
          <Link to="/">The Coolest Website</Link>
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Main user={user} />} />
          <Route
            path="signup"
            element={
              <Signup
                users={users}
                addUser={addUser}
                setLoginUser={setLoginUser}
              />
            }
          />
          <Route path="welcome" element={<Welcome user={user} />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </main>
    </div>
  );
};

export default Home;
