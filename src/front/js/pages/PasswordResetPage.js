import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


const PasswordResetPage = ({ actions }) => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    try {
      await actions.resetPassword(token, newPassword);
      navigate('/login');
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  };

  return (
    <div className="password-reset-page">
      <h2>Password Reset</h2>
      <form>
        <label htmlFor="newPassword">New Password:</label>
        <input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        <button type="button" onClick={handleResetPassword}>Reset Password</button>
      </form>
    </div>
  );
};

export default PasswordResetPage;

