import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';

const RegistrationForm = () => {
  const { actions } = useContext(Context);
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
    console.log("Form data:", formData);

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
      if (error.response && error.response.data) {
        console.error('Registration failed:', error.response.data);
      } else {
        console.error('An error occurred while processing your registration:', error);
      }
    }
  };

  return (
    <div className="sectionSpace">
      <form className="modalForm" id="registration-form" onSubmit={handleSubmit}>
        <div className="tittlePositionForm">
          <h3 className="formTittle">REGISTRO</h3>
        </div>
        <div className="inputMargin">
          <label htmlFor="first_name">Primer Nombre:</label>
          <input className='space'
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="inputMargin">
          <label htmlFor="last_name">Ultimo Nombre:</label>
          <input className='space'
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="inputMargin">
          <label htmlFor="username">Nombre de Usuario:</label>
          <input className='space'
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="inputMargin">
          <label htmlFor="email">Email:</label>
          <input className='space'
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="inputMargin">
          <label htmlFor="password">Contraseña:</label>
          <input className='space'
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="inputMargin">
          <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
          <input className='space'
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="buttonPosition">
          <button id="registerButtonForm" className="btn btn-primary" type="submit">
            Registrarse
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
