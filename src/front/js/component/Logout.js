import React, { useState } from 'react';


const Logout = ({ setStoreLog }) => {
    const [logoutMessage, setLogoutMessage] = useState('');

    const handleLogout = async () => {
        try {
            // Llama al endpoint de logout
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
    
            // Elimina el token de acceso del almacenamiento local
            localStorage.removeItem('access_token');
    
            // Obtiene el nuevo token de acceso del header de la respuesta
            const newAccessToken = response.headers.get('X-NEW-ACCESS-TOKEN');
    
            console.log('Logout successful.');
            // Actualiza el estado de la sesión y el nuevo token de acceso
            setStoreLog({
                session: {
                    isLoggedIn: false,
                    user: null,
                    accessToken: newAccessToken,
                }
            });
    
            // Set logout message
            setLogoutMessage('You have successfully logged out.');
    
            // Redirect the user to the home page after logout
            setTimeout(() => {
                window.location.replace('/');
            }, 2000);
        } catch (error) {
            console.error('Error logging out:', error);
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
