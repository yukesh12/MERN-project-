import React, { useState } from 'react';
import axios from 'axios';
import './CreateEmployee.css';

const CreateEmployee = () => {
    const [employeeData, setEmployeeData] = useState({
        name: '',
        email: '',
        mobile: '',
        designation: '',
        gender: '',
        courses: [],
        image: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setEmployeeData((prevData) => {
            const courses = checked
                ? [...prevData.courses, value]
                : prevData.courses.filter((course) => course !== value);
            return { ...prevData, courses };
        });
    };

    const handleImageChange = (e) => {
        setEmployeeData((prevData) => ({
            ...prevData,
            image: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const key in employeeData) {
            formData.append(key, employeeData[key]);
        }

        try {
            const token = localStorage.getItem('token'); 
            const response = await axios.post('http://localhost:5000/api/employees', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data', 
                },
            });
            console.log('Employee created:', response.data);
            
        } catch (error) {
            console.error('Error creating employee:', error.response?.data || error.message);
        }
    };

    return (
        <div className="create-employee-container">
            <h2>Create Employee</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" value={employeeData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={employeeData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Mobile No</label>
                    <input type="text" name="mobile" value={employeeData.mobile} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Designation</label>
                    <select name="designation" value={employeeData.designation} onChange={handleChange} required>
                        <option value="">Select Designation</option>
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Gender</label>
                    <div>
                        <input type="radio" name="gender" value="M" onChange={handleChange} required /> Male
                        <input type="radio" name="gender" value="F" onChange={handleChange} required /> Female
                    </div>
                </div>
                <div className="form-group">
                    <label>Course</label>
                    <div>
                        <input type="checkbox" value="MCA" onChange={handleCheckboxChange} /> MCA
                        <input type="checkbox" value="BCA" onChange={handleCheckboxChange} /> BCA
                        <input type="checkbox" value="BSC" onChange={handleCheckboxChange} /> BSC
                    </div>
                </div>
                <div className="form-group">
                    <label>Image Upload</label>
                    <input type="file" onChange={handleImageChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Create Employee</button>
            </form>
        </div>
    );
};

export default CreateEmployee;
