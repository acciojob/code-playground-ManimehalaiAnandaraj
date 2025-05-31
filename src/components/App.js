import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useNavigate } from 'react-router-dom';

const App = () => {
    const navigate = useNavigate;
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = () => {
        setIsAuthenticated(true);
        navigate('/'); 
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        navigate('/login'); 
    };

    return (
        <Router>
            <div className="main-container">
                <nav>
                    <ul style={{ display: 'flex', listStyle: 'none', gap: '20px' }}>
                        <li>
                            <Link to="/">PlayGround</Link>
                        </li>
                        <li>
                            <Link to="/login">Log In</Link>
                        </li>
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
            <p>Login</p>
            <button onClick={onLogin}>Log In</button>
        </div>
    );
};

export default App;