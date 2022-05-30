import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Main from './routes/Main';
import Signup from './routes/Signup';
import Welcome from './routes/Welcome';
import Error from './components/Error';

function Home() {
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
          <Route path="/" element={<Main />} />
          <Route path="signup" element={<Signup />} />
          <Route path="welcome" element={<Welcome />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </main>
    </div>
  );
}

export default Home;
