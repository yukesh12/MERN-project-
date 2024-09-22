import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Layout.css';

const Layout = () => {
    const navigate = useNavigate();
    const { userName, logout } = useAuth();

    const handleLogout = () => {
        localStorage.removeItem('token');
        logout();
        navigate('/login');
    };

    return (
        <div className="layout-container">
            <header className="layout-header">
                <nav className="layout-nav">
                    <ul>
                        <li onClick={() => navigate('/dashboard')}>Home</li>
                        <li onClick={() => navigate('/employee-list')}>Employee List</li>
                        <li onClick={() => navigate('/create-employee')}>Create Employee</li>
                    </ul>
                    <div className="user-info">
                        <span>{userName || 'Guest'}</span>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
