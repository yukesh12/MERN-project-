import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import EmployeeList from './components/EmployeeList';
import CreateEmployee from './components/CreateEmployee';
import EmployeeEdit from './components/EmployeeEdit';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Layout />}>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="employee-list" element={<EmployeeList />} />
                        <Route path="create-employee" element={<CreateEmployee />} />
                        <Route path="edit-employee/:id" element={<EmployeeEdit />} />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
