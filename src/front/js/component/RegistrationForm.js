import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext'; // Import your app context

const RegistrationForm = () => {
  const { actions } = useContext(Context); // Access the context and its actions
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data:", formData); // Agregar este console.log()

    try {
      // Call the action to create a user from the context
      await actions.handleCreateUser(formData.first_name,
        formData.last_name,
        formData.username,
        formData.email,
        formData.password,
        formData.confirmPassword);

      // Reset form fields
      setFormData({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    } catch (error) {
      // Handle error if registration fails
      if (error.response && error.response.data) {
        console.error('Registration failed:', error.response.data);
      } else {
        console.error('An error occurred while processing your registration:', error);
      }
    }
  };

  // JSX
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="first_name">First Name:</label>
        <input type="text" id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="last_name">Last Name:</label>
        <input type="text" id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
