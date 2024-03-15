// UserProfileMine.js
//actualizar perfil usuario
//eliminar cuenta usuario
//ver eventos que he creado

import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import { fetchUserProfile } from '../store/flux'; // Import the fetchUserProfile action
import { editUserProfile } from '../store/flux';

const UserProfileMine = () => {
  const { actions } = useContext(Context);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Fetch user profile information when component mounts
    fetchUserProfile()
      .then(userProfileData => setUserProfile(userProfileData))
      .catch(error => console.error('Error fetching user profile:', error));
  }, [actions]);

  // Check if userProfile is null, if null, edit button can't be seen. ¿backend connection would fix it?
  useEffect(() => {
    if (userProfile === null) {
      console.log('userProfile is null');
      // Or display a message
      // return <div>User profile is null</div>;
    }
  }, [userProfile]);

  const handleEditProfile = async (updatedProfileData) => {
    try {
      await editUserProfile(userProfile.id, updatedProfileData);
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
          <button onClick={handleEditProfile}>Edit Profile</button>
          {/* Render other user profile information */}
        </div>
      )}
    </div>
  );
};

export default UserProfileMine;


