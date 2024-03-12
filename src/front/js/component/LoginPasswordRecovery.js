import React from 'react';

const LoginPasswordRecovery = () => {
  const [username, setUsername] = useState('');
  const [recoverySent, setRecoverySent] = useState(false);

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
    } catch (error) {
      console.error('Error recovering password:', error);
      // Handle error (e.g., display an error message to the user)
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

      {recoverySent && <p>Password recovery email sent. Please check your inbox.</p>}
    </div>
  );
};


export default LoginPasswordRecovery;
