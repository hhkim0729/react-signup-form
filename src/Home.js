import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Main from './routes/Main';
import Signup from './routes/Signup';
import Welcome from './routes/Welcome';
import Error from './components/Error';

function Home() {
  const [users, setUsers] = useState([
    { email: 'hello@gmail.com', phone: '01012345678', username: 'hello' },
    { email: 'world@naver.com', phone: '020001111', username: 'world' },
    {
      email: 'heehkim@student.42seoul.kr',
      phone: '01009876543',
      username: 'heehkim',
    },
  ]);
  const [user, setUser] = useState({});

  const addUser = ({ email, phone, username }) => {
    setUsers((prev) =>
      prev.concat({
        email: email,
        phone: phone,
        username: username,
      })
    );
  };

  const setLoginUser = ({ email, phone, username }) => {
    setUser({
      email: email,
      phone: phone,
      username: username,
    });
  };

  return (
    <div>
      <header>
        <nav>
          <Link to="/welcome">welcome</Link>
        </nav>
        <div>
          <Link to="/">The Coolest website</Link>
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
}

export default Home;
