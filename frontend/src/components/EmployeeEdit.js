import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './EmployeeEdit.css';

const EmployeeEdit = () => {
    const [employee, setEmployee] = useState({ name: '', email: '', mobile: '', designation: '', gender: '', course: '' });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployee = async () => {
            const response = await axios.get(`/api/employees/${id}`);
            setEmployee(response.data);
        };
        fetchEmployee();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/employees/${id}`, employee);
            navigate('/employee-list');
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    };

    return (
        <div className="employee-edit-container">
            <h1>Edit Employee</h1>
            <form onSubmit={handleUpdate}>
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
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default EmployeeEdit;
