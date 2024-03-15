import React from 'react';
import { useState } from 'react';
import { useStore } from '../store/flux';


const LoginPasswordRecovery = () => {
  const { actions } = useStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [recoverySent, setRecoverySent] = useState(false);
  const [error, setError] = useState(null); // New state for error message

  // Function to handle password recovery
  const handlePasswordRecovery = async () => {
    try {
      const usernameValue = username;

      // Call the API endpoint to send a recovery email
      //replace process.env.API_URL with the actual URL of our API endpoint
      const response = await fetch(`https://opulent-space-train-wwpgj6v5vrxh5j5j-3001.app.github.dev/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: usernameValue }),
      });

      if (!response.ok) {
        throw new Error('Failed to send recovery email');
      }

      setRecoverySent(true);
      setError(null); // Reset error state if recovery succeeds
    } catch (error) {
      console.error('Error recovering password:', error);
      setError('Failed to send recovery email. Please try again.'); // Set error message
    }
  };

  // Function to handle login submission
  const handleLoginSubmit = async () => {
    try {
      // Call the login action from the store
      await actions.login(username, password);

      // Clear form fields after successful login
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Failed to log in. Please try again.'); // Set error message
    }
  };

  //JSX - ATLAS
  return (
    <div className="login-password-recovery">
      <h2>Login</h2>
      {/* Login form */}
      <form>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="button" onClick={handleLoginSubmit}>
          Log In
        </button>
        <button type="button" onClick={handlePasswordRecovery}>
          Recover Password
        </button>
      </form>

      {/* Display error message if error state is not null */}
      {error && <p className="error">{error}</p>}

      {recoverySent && <p>Password recovery email sent. Please check your inbox.</p>}
    </div>
  );
};


export default LoginPasswordRecovery;
