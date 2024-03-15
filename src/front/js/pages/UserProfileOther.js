import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Assuming you're using React Router
import { fetchUserProfile } from '../store/flux'; // Import the fetchUserProfile action

const UserProfileOther = () => {
  const { userId } = useParams(); // Get the userId from the URL params
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Fetch user profile information when component mounts
    fetchUserProfile(userId)
      .then(userProfileData => setUserProfile(userProfileData))
      .catch(error => console.error('Error fetching user profile:', error));
  }, [userId]);

  return (
    <div>
      <h1>User Profile</h1>
      {userProfile && (
        <div>
          <p>Username: {userProfile.username}</p>
          <p>Email: {userProfile.email}</p>
          {/* Render other user profile information */}
        </div>
      )}
    </div>
  );
};

export default UserProfileOther;
