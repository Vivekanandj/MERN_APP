import React, { useState } from 'react';

const EmployeeForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        designation: 'HR',
        gender: '',
        course: [],
        image: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            course: checked
                ? [...prevData.course, value]
                : prevData.course.filter((course) => course !== value),
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
            setFormData({ ...formData, image: file });
        } else {
            alert('Only jpg/png files are allowed.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform validation or form submission logic here
        console.log(formData);
    };

    return (
        <div className="employee-form">
            <h3>Create Employee</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Textbox"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Textbox"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div>
                    <label>Mobile No:</label>
                    <input
                        type="text"
                        name="mobile"
                        placeholder="Textbox"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        required
                        pattern="\d*" // numeric validation
                        maxLength="10"
                    />
                </div>

                <div>
                    <label>Designation:</label>
                    <select
                        name="designation"
                        value={formData.designation}
                        onChange={handleInputChange}
                    >
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                    </select>
                </div>

                <div>
                    <label>Gender:</label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="Male"
                            checked={formData.gender === 'Male'}
                            onChange={handleInputChange}
                        />
                        Male
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="Female"
                            checked={formData.gender === 'Female'}
                            onChange={handleInputChange}
                        />
                        Female
                    </label>
                </div>

                <div>
                    <label>Course:</label>
                    <label>
                        <input
                            type="checkbox"
                            name="course"
                            value="MCA"
                            checked={formData.course.includes('MCA')}
                            onChange={handleCheckboxChange}
                        />
                        MCA
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="course"
                            value="BCA"
                            checked={formData.course.includes('BCA')}
                            onChange={handleCheckboxChange}
                        />
                        BCA
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="course"
                            value="BSC"
                            checked={formData.course.includes('BSC')}
                            onChange={handleCheckboxChange}
                        />
                        BSC
                    </label>
                </div>

                <div>
                    <label>Img Upload:</label>
                    <input
                        type="file"
                        name="image"
                        accept=".jpg, .jpeg, .png"
                        onChange={handleFileChange}
                        required
                    />
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default EmployeeForm;
