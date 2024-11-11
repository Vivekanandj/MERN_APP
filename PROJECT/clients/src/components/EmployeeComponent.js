import React from 'react';

const EmployeeComponent = ({ employee }) => {
    return (
        <tr>
            <td>{employee.id}</td>
            <td>Image</td>
            <td>{employee.name}</td>
            <td>{employee.email}</td>
            <td>{employee.mobile}</td>
            <td>{employee.designation}</td>
            <td>{employee.gender}</td>
            <td>{employee.course}</td>
            <td>{employee.date}</td>
            <td>
                <button className="edit-button">Edit</button>
                <button className="delete-button">Delete</button>
            </td>
        </tr>
    );
};

export default EmployeeComponent;
