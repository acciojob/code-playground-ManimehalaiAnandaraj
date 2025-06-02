import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
  useNavigate,
} from 'react-router-dom';

// Placeholder components
const HomePage = () => <h2>Welcome to the Playground</h2>;

const LoginPage = ({ onLogin }) => {
  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={onLogin}>Log In</button>
    </div>
  );
};

const PrivateRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const Main = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
      setIsAuthenticated(true);
      navigate('/');
    };

    const handleLogout = () => {
      setIsAuthenticated(false);
      navigate('/login');
    };

    return (
      <div className="main-container">
        <nav>
          <ul style={{ display: 'flex', listStyle: 'none', gap: '20px' }}>
            <li>
              <Link to="/">PlayGround</Link>
            </li>
            {!isAuthenticated && (
              <li>
                <Link to="/login">Log In</Link>
              </li>
            )}
          </ul>
          <div>
            {isAuthenticated ? (
              <>
                <p>Logged in, Now you can enter Playground</p>
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
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route
            path="*"
            element={<Navigate to={isAuthenticated ? '/' : '/login'} />}
          />
        </Routes>
      </div>
    );
  };

  return (
    <Router>
      <Main />
    </Router>
  );
}

export default App;
