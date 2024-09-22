import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EmployeeList.css';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployees = async () => {
            const token = localStorage.getItem('token');

            try {
                const response = await axios.get('http://localhost:5000/api/employees', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setEmployees(response.data);
            } catch (error) {
                console.error('Error fetching employees:', error);
                if (error.response && error.response.status === 401) {
                    navigate('/login');
                }
            }
        };
        fetchEmployees();
    }, [navigate]);

    const handleCreateEmployee = () => {
        navigate('/create-employee');
    };

    const handleEditEmployee = (id) => {
        navigate(`/edit-employee/${id}`);
    };

    return (
        <div className="employee-list-container">
            <h2>Employee List</h2>
            <button onClick={handleCreateEmployee} className="btn btn-primary">Create Employee</button>

            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Designation</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee._id}>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.mobile}</td>
                            <td>{employee.designation}</td>
                            <td>
                                <button className="btn btn-warning" onClick={() => handleEditEmployee(employee._id)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;
