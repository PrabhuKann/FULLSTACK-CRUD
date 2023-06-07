import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmployeeList.css'; // Import the CSS file

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);
  const [updatedEmployee, setUpdatedEmployee] = useState({});
  const [newEmployee, setNewEmployee] = useState({});

  const recordsPerPage = 10;

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const fetchEmployeeData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(employees); // Log the employees state
  }, [employees]);

  const handleUpdate = (id) => {
    // Set the editingEmployeeId to enable editing mode for the specific employee
    setEditingEmployeeId(id);
  };

  const handleInputChange = (e, field) => {
    // Update the updatedEmployee state with the changed field value
    setUpdatedEmployee((prevState) => ({
      ...prevState,
      [field]: e.target.value,
    }));
  };

  const handleUpdateSubmit = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/employees/${id}`, updatedEmployee);
      setEmployees((prevState) =>
        prevState.map((employee) => {
          if (employee.id === id) {
            return { ...employee, ...updatedEmployee };
          }
          return employee;
        })
      );
      setEditingEmployeeId(null);
      setUpdatedEmployee({});
      console.log('Successfully updated employee with ID:', id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
      if (confirmDelete) {
        await axios.delete(`http://localhost:8080/api/employees/${id}`);
        setEmployees(employees.filter((employee) => employee.id !== id));
        console.log('Successfully deleted employee with ID:', id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddEmployee = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/employees', newEmployee);
      setEmployees([...employees, response.data]);
      setNewEmployee({});
      console.log('Successfully added new employee:', response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Calculate pagination
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = employees.slice(indexOfFirstRecord, indexOfLastRecord);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (employees.length === 0) {
    return <div>No employees found.</div>; // Display a message if the employees array is empty
  }

  return (
    <div className="container">
      <h1>Employee List</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((employee) => (
              <tr key={employee.id}>
                <td>
                  {editingEmployeeId === employee.id ? (
                    <input
                      type="text"
                      value={updatedEmployee.firstName || employee.firstName}
                      onChange={(e) => handleInputChange(e, 'firstName')}
                    />
                  ) : (
                    employee.firstName
                  )}
                </td>
                <td>
                  {editingEmployeeId === employee.id ? (
                    <input
                      type="text"
                      value={updatedEmployee.lastName || employee.lastName}
                      onChange={(e) => handleInputChange(e, 'lastName')}
                    />
                  ) : (
                    employee.lastName
                  )}
                </td>
                <td>
                  {editingEmployeeId === employee.id ? (
                    <input
                      type="text"
                      value={updatedEmployee.email || employee.email}
                      onChange={(e) => handleInputChange(e, 'email')}
                    />
                  ) : (
                    employee.email
                  )}
                </td>
                <td>
                  {editingEmployeeId === employee.id ? (
                    <div>
                      <button onClick={() => handleUpdateSubmit(employee.id)}>Submit</button>
                      <button onClick={() => setEditingEmployeeId(null)}>Cancel</button>
                    </div>
                  ) : (
                    <div>
                      <button onClick={() => handleUpdate(employee.id)}>Update</button>
                      <button onClick={() => handleDelete(employee.id)}>Delete</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(employees.length / recordsPerPage) }, (_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>

      {/* Add Employee */}
      <div className="add-employee">
        <h2>Add Employee</h2>
        <input
          type="text"
          placeholder="First Name"
          value={newEmployee.firstName || ''}
          onChange={(e) => setNewEmployee((prevState) => ({ ...prevState, firstName: e.target.value }))}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={newEmployee.lastName || ''}
          onChange={(e) => setNewEmployee((prevState) => ({ ...prevState, lastName: e.target.value }))}
        />
        <input
          type="text"
          placeholder="Email"
          value={newEmployee.email || ''}
          onChange={(e) => setNewEmployee((prevState) => ({ ...prevState, email: e.target.value }))}
        />
        <button onClick={handleAddEmployee}>Add Employee</button>
      </div>
    </div>
  );
};

export default EmployeeList;
