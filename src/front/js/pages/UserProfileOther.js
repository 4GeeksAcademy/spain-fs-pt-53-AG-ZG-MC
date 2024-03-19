import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../store/appContext';
import { useParams } from 'react-router-dom'; // Assuming you're using React Router

const UserProfileOther = () => {
  const { userId } = useParams(); // Get the userId from the URL params
  const { store, actions } = useContext(Context);
  const { userProfile  } = store

  useEffect(() => {
    // Fetch user profile information when component mounts
    actions.fetchUserProfile(userId)
      .then(userProfileData => console.log('User profile fetched:', userProfileData))
      .catch(error => console.error('Error fetching user profile:', error));
  }, [userId]);

  console.log("User Other Page:", userProfile);

  return (
    <div>
      <h1>User Profile</h1>
      {userProfile && (
        <div>
          <p>Username: {userProfile.name}</p>
          <p>Email: {userProfile.email}</p>
          {/* Render other user profile information */}
        </div>
      )}
    </div>
  );
};

export default UserProfileOther;
