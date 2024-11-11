import React, { useState } from 'react';
import EmployeeComponent from './EmployeeComponent'; // Import EmployeeComponent

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]); // Initialize with an empty array
    const [newEmployee, setNewEmployee] = useState({
        name: '',
        email: '',
        mobile: '',
        designation: '',
        gender: '',
        course: '',
        date: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEmployee({
            ...newEmployee,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newEmployee.name && newEmployee.email) { // Basic validation
            const newEmp = { ...newEmployee, id: employees.length + 1 }; // Add unique ID
            setEmployees([...employees, newEmp]); // Add new employee to the list
            setNewEmployee({ name: '', email: '', mobile: '', designation: '', gender: '', course: '', date: '' }); // Reset form
        } else {
            alert('Please fill in all fields');
        }
    };

    return (
        <div>
            {/* Form to add new employee */}
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Name" 
                    value={newEmployee.name} 
                    onChange={handleInputChange} 
                />
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    value={newEmployee.email} 
                    onChange={handleInputChange} 
                />
                <input 
                    type="text" 
                    name="mobile" 
                    placeholder="Mobile No" 
                    value={newEmployee.mobile} 
                    onChange={handleInputChange} 
                />
                <input 
                    type="text" 
                    name="designation" 
                    placeholder="Designation" 
                    value={newEmployee.designation} 
                    onChange={handleInputChange} 
                />
                <input 
                    type="text" 
                    name="gender" 
                    placeholder="Gender" 
                    value={newEmployee.gender} 
                    onChange={handleInputChange} 
                />
                <input 
                    type="text" 
                    name="course" 
                    placeholder="Course" 
                    value={newEmployee.course} 
                    onChange={handleInputChange} 
                />
                <input 
                    type="text" 
                    name="date" 
                    placeholder="Create Date" 
                    value={newEmployee.date} 
                    onChange={handleInputChange} 
                />
                <button type="submit">Add Employee</button>
            </form>

            {/* Employee Table */}
            {employees.length === 0 ? (
                <p>No employees added yet. Please add an employee.</p>
            ) : (
                <table className="employee-table">
                    <thead>
                        <tr>
                            <th>Unique Id</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile No</th>
                            <th>Designation</th>
                            <th>Gender</th>
                            <th>Course</th>
                            <th>Create Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <EmployeeComponent key={employee.id} employee={employee} />
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default EmployeeList;
