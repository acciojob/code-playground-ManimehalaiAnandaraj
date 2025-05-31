import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import PrivateRoute from './PrivateRoute';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="main-container">
      <nav>
        <Link to="/login">Login</Link> |{' '}
        <Link to="/home">PlayGround</Link>
        <p>Status: {isAuthenticated ? 'Logged in, Now you can enter playground' : 'You are not authenticated, please login first'}</p>
      </nav>
      <Routes>
        <Route
          path="/home"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
      </Routes>
    </div>
  );
}

export default App;
