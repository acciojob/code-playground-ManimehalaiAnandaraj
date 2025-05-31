
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="main-container">
        <nav>
          <ul style={{ display: 'flex', listStyle: 'none', gap: '20px' }}>
            <li>
              <Link to="/">Home (Playground)</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
          <div>
            {isAuthenticated ? (
              <>
                <span>Logged in, Now you can enter Playground</span>
                <button onClick={handleLogout}>Log Out</button>
              </>
            ) : (
              <span>You are not authenticated, Please login first</span>
            )}
          </div>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/login"
            element={
              <LoginPage 
                isAuthenticated={isAuthenticated} 
                onLogin={handleLogin} 
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

const PrivateRoute = ({ children, isAuthenticated }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const HomePage = () => {
  return (
    <div>
      <h1>Code Playground</h1>
      <p>Hi Welcome to Code playground</p>
    </div>
  );
};

const LoginPage = ({ isAuthenticated, onLogin }) => {
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h1>Login</h1>
      <button onClick={onLogin}>[Log In]</button>
    </div>
  );
};

export default App;