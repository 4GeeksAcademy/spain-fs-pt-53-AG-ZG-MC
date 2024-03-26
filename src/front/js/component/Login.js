import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';


const Login = () => {
  const { actions } = useContext(Context);
  
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [email, setEmail] = useState(''); 
  const [recoverySent, setRecoverySent] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);


  const handleShowEmailInput = () => {
    setShowEmailInput(true);
  };

  // Function to handle password recovery
  const handlePasswordRecovery = async () => {
    try {
        console.log("Initiating password recovery for email:", email);
        await actions.initiatePasswordRecovery(email);
        setRecoverySent(true);
        setError(null);
    } catch (error) {
        console.error('Error initiating password recovery:', error);
        setError('Failed to send recovery email. Please try again.');
    }
};

  // Function to handle login submission
  const handleLoginSubmit = async () => {
    try {
      console.log('Attempting login...');

      // Check if actions and login function exist
      if (actions && actions.login) {
        console.log('Login action exists, attempting login...');

        // Call the login action from the store
        await actions.login(username, password);

        // Clear form fields after successful login
        console.log('Login successful. Clearing form fields...');
        setUsername('');
        setPassword('');
        setError(null);
      } else {
        throw new Error('Login action is not available');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Failed to log in. Please try again.');
    }
  };

  return (
    <div className="login-password-recovery">
      {/*<h2>Login</h2>*/}
      
      {/* Mostrar el botón de recuperación de contraseña si no se está mostrando el campo de entrada para el correo electrónico */}
      {/*
      {!showEmailInput && (
        <button type="button" onClick={handleShowEmailInput}>
          Recover Password
        </button>
      )}
      */}

      {/* Mostrar el campo de entrada para el correo electrónico si showEmailInput es verdadero */}
      {/*
      {showEmailInput && (
        <form>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button type="button" onClick={handlePasswordRecovery}>
            Submit
          </button>
        </form>
      )}
      */}

      {/* Formulario de inicio de sesión */}
      <div className="sectionSpace">
        <form className="modalForm">
            <div className="tittlePositionForm">
                <h3 className="formTittle">INICIO SESIÓN</h3>
            </div>
            <div className="inputMargin">
            <label htmlFor="username">Username:</label>
            <input className='space' type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} /> {/* Usar setUsername */}
            </div>
            
            <div className="inputMargin">
            <label htmlFor="password">Password:</label>
            <input className='space' type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            
            <div className="buttonPosition">
            <button id="registerButtonForm" type="button" onClick={handleLoginSubmit}>
            Iniciar Sesión
            </button>
            </div>
            <p className='pStyle'>Or if you don't remember your password you should...</p>
            {!showEmailInput && (
            <div className="buttonPosition">
            <button className='recoverButton' type="button" onClick={handleShowEmailInput}>
              Recover Password
            </button>
            </div>
            )}
            {showEmailInput && (
              <form className='inputMargin'>
                <label htmlFor="email">Email:</label>
                <input className='space' type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <button className='recoverButton space' type="button" onClick={handlePasswordRecovery}>
                  Submit
                </button>
              </form>
            )}
        </form>
      </div>

      {error && <p className="error">{error}</p>}

      {recoverySent && <p>Password recovery email sent. Please check your inbox.</p>}
    </div>
  );
};


export default Login;
