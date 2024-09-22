import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EmployeeForm.css';

const EmployeeForm = () => {
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        mobile: '',
        designation: '',
        gender: '',
        course: '',
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/employees', employee);
            if (response.status === 201) {
                navigate('/employee-list');
            } else {
                console.error('Failed to create employee');
            }
        } catch (error) {
            console.error('Error creating employee:', error);
        }
    };

    return (
        <div className="employee-form-container">
            <h1>Create Employee</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" value={employee.name} onChange={(e) => setEmployee({ ...employee, name: e.target.value })} required />
                <input type="email" placeholder="Email" value={employee.email} onChange={(e) => setEmployee({ ...employee, email: e.target.value })} required />
                <input type="text" placeholder="Mobile" value={employee.mobile} onChange={(e) => setEmployee({ ...employee, mobile: e.target.value })} required />
                <input type="text" placeholder="Designation" value={employee.designation} onChange={(e) => setEmployee({ ...employee, designation: e.target.value })} required />
                <select value={employee.gender} onChange={(e) => setEmployee({ ...employee, gender: e.target.value })} required>
                    <option value="">Select Gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                </select>
                <input type="text" placeholder="Course" value={employee.course} onChange={(e) => setEmployee({ ...employee, course: e.target.value })} required />
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default EmployeeForm;
