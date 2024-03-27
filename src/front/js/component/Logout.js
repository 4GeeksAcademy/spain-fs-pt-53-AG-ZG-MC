import React, { useState } from 'react';


const Logout = ({ setStoreLog }) => {
    const [logoutMessage, setLogoutMessage] = useState('');

    const handleLogout = async () => {
        try {
            
            const response = await fetch(`${process.env.BACKEND_URL}/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
                },
            });
    
            if (!response.ok) {
                throw new Error('Failed to logout');
            }
    
           
            localStorage.removeItem('access_token');
    
           
            const newAccessToken = response.headers.get('X-NEW-ACCESS-TOKEN');
    
            
          
            setStoreLog({
                session: {
                    isLoggedIn: false,
                    user: null,
                    accessToken: newAccessToken,
                }
            });
    
           
            setLogoutMessage('You have successfully logged out.');
    
            setTimeout(() => {
                window.location.replace('/');
            }, 2000);
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };
    
    
    return (
        <div className="form-check">
            {logoutMessage && <p>{logoutMessage}</p>}
            <button id="cerrarSesion" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Logout;
