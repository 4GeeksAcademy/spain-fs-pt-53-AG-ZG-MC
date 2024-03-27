import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom'; 
import ProfileEdit from '../component/ProfileEdit';
import MyEvents from '../component/MyEvents';
import './../../styles/registrationForm.css';
import paisaje from './../../img/paisaje.jpeg';


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
    <div className='searchbarPosition'>
    <div className='searchbarContainer2'>
      
      <div className='tittleHeaderWrap'><h1>User Profile</h1></div>
      {isEditing ? (
        <ProfileEdit user={userProfile} />
      ) : (
        userProfile && (
          <div>
            <div className='UserInfoFlex'>
            <div className='imgUserProfile' style={{backgroundImage: `url(${paisaje})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center"
                }}>
            </div>
              <div>
                <p className='InfoUserProfile'>Username:<p className='InfoUserProfile2'>{userProfile.username}</p></p>
                <p className='InfoUserProfile'>Email:<p className='InfoUserProfile2'>{userProfile.email}</p></p>
                <p className='InfoUserProfile'>First name:<p className='InfoUserProfile2'> {userProfile.first_name}</p></p>
                <p className='InfoUserProfile'>Last name:<p className='InfoUserProfile2'>{userProfile.last_name}</p></p> 
              </div>
            </div>
            <MyEvents />
            <div className='buttonContainer'>
            <button className='showFilterButton' onClick={handleEditClick}>Edit Profile</button>
            <button className='showFilterButton' onClick={handleDeleteClick}>Delete Profile</button>
            </div>
          </div>
        )
      )}
    </div>
    </div>
  );
};

export default UserProfileMine;


