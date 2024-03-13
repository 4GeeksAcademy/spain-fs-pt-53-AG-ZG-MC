import React from 'react';
import React, { useState } from 'react';


const LoginPasswordRecovery = () => {
  const [username, setUsername] = useState('');
  const [recoverySent, setRecoverySent] = useState(false);
  const [error, setError] = useState(null); // New state for error message

  // Function to handle password recovery
  const handlePasswordRecovery = async () => {
    try {
      // Call the API endpoint to send a recovery email
      //replace process.env.API_URL with the actual URL of our API endpoint
      const response = await fetch(`${process.env.API_URL}/password/recovery`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
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

  //JSX - ATLAS
  return (
    <div className="login-password-recovery">
      <h2>Login</h2>
      {/* Login form */}
      <form>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />

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
