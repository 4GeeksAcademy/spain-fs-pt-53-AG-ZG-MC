import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom'; 
import ProfileEdit from '../component/ProfileEdit';
import MyEvents from '../component/MyEvents';


const UserProfileMine = () => {
  const { store, actions } = useContext(Context);
  const [userProfile, setUserProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [isMounted, setIsMounted] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfile = await actions.fetchUserProfile();
        if (isMounted) { 
          setUserProfile(userProfile);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError(error.message);
      }
    };

    fetchUserProfile();

    return () => {
      setIsMounted(false);
    };
  }, [isMounted, actions.fetchUserProfile]);

  const handleEditClick = () => {
    setIsEditing(true);
  };


  const handleDeleteClick = async () => {
    try {
      if (window.confirm("Are you sure you want to delete your profile?")) {
        const deletedUserProfile = await actions.deleteUser();
        if (deletedUserProfile) {
          setIsEditing(false);
          console.log('User deleted successfully');
  
          actions.clearUser();
  
          localStorage.removeItem("access_token");
  
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>User Profile</h1>
      {isEditing ? (
        <ProfileEdit user={userProfile} />
      ) : (
        userProfile && (
          <div>
            <p>Username: {userProfile.username}</p>
            <p>Email: {userProfile.email}</p>
            <p>First name: {userProfile.first_name}</p>
            <p>Last name: {userProfile.last_name}</p>
            <MyEvents />

            <button onClick={handleEditClick}>Edit Profile</button>
            <button onClick={handleDeleteClick}>Delete Profile</button>
          </div>
        )
      )}
    </div>
  );
};

export default UserProfileMine;


