import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [email, setEmail] = useState(''); 
  const [recoverySent, setRecoverySent] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);


  const handleShowEmailInput = () => {
    setShowEmailInput(true);
  };

  
  const handlePasswordRecovery = async () => {
    try {
        
        await actions.initiatePasswordRecovery(email);
        setRecoverySent(true);
        setError(null);
    } catch (error) {
        console.error('Error initiating password recovery:', error);
        setError('Failed to send recovery email. Please try again.');
    }
};

  const handleLoginSubmit = async () => {
    try {
      

    
      if (actions && actions.login) {
        

      
        await actions.login(username, password);

     
        
        setUsername('');
        setPassword('');
        setError(null);
        navigate('/');
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
      

     
      <div className="sectionSpace">
        <form className="modalForm">
            <div className="tittlePositionForm">
                <h3 className="formTittle">LOG IN</h3>
            </div>
            <div className="inputMargin">
            <label htmlFor="username">Username</label>
            <input className='space' type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} /> 
            </div>
            
            <div className="inputMargin">
            <label htmlFor="password">Password</label>
            <input className='space' type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            
            <div className="buttonPosition">
            <button id="registerButtonForm" type="button" onClick={handleLoginSubmit}>
            LOG IN
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
                <label htmlFor="email">Email</label>
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
