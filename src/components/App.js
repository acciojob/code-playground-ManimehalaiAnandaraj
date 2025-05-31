import React, { useState } from 'react';
import {
    BrowserRouter,
    Route,
    Routes,
    Link,
    Navigate,
    useNavigate
} from 'react-router-dom';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <BrowserRouter>
            <Main
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
            />
        </BrowserRouter>
    );
};

const Main = ({ isAuthenticated, setIsAuthenticated }) => {
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
                {/* Optional: Catch-all route for 404 Not Found */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
};

const PrivateRoute = ({ children, isAuthenticated }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
};

const HomePage = () => {
    return (
        <div>
            <p>Hi, Welcome to the Code Playground!</p>
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
