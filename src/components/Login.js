import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate('/home');
  };

  return (
    <div>
     <p>Login</p>
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
}

export default Login;
