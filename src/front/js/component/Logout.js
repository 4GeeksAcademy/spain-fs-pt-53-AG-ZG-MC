import React, { useState } from 'react';

const Logout = () => {
    const [logoutMessage, setLogoutMessage] = useState('');

    const handleLogout = () => {
        try {
            // Clear session storage or remove authentication token
            sessionStorage.removeItem('authToken');

            // Set logout message
            setLogoutMessage('You have successfully logged out.');

            // Redirect the user to the home page after logout
            setTimeout(() => {
                window.location.replace('/'); // Redirect to home page
            }, 2000); // Redirect after 2 seconds
        } catch (error) {
            console.error('Logout failed:', error);
            // Handle logout failure
        }
    };

    return (
        <div>
            {logoutMessage && <p>{logoutMessage}</p>}
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Logout;
