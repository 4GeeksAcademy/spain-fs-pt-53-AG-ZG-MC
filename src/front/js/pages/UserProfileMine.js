// UserProfileMine.js
//actualizar perfil usuario
//eliminar cuenta usuario
//ver eventos que he creado

import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import { Link } from 'react-router-dom';


const UserProfileMine = () => {
  const { store, actions } = useContext(Context);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Fetch user profile information when component mounts
    actions.fetchUserProfile()
      .then(userProfileData => setUserProfile(userProfileData))
      .catch(error => console.error('Error fetching user profile:', error));
  }, []);

  // Check if userProfile is null, if null, edit button can't be seen. ¿backend connection would fix it?
  useEffect(() => {
    if (userProfile === null) {
      console.log("User Mine Page:", userProfile);
      // Or display a message
      // return <div>User profile is null</div>;
    }
  }, [userProfile]);

  const handleEditProfile = async (updatedProfileData) => {
    try {
      await actions.editUserProfile(userProfile.id, updatedProfileData);
      // Optionally, update state or show success message
    } catch (error) {
      console.error('Error editing user profile:', error);
      // Handle error
    }
  };

  return (
    <div>
      <h1>User Profile</h1>
      {userProfile && (
        <div>
          <p>Username: {userProfile.username}</p>
          <p>Email: {userProfile.email}</p>
          <Link to="/edit-profile">Edit Profile</Link>
          {userProfile ? (
            <button onClick={handleEditProfile}>Edit Profile</button>
          ) : (
            <div>User profile is null</div>
          )}

        </div>
      )}
    </div>
  );
};

export default UserProfileMine;


