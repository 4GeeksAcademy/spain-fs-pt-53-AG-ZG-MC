import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../store/appContext';
import { useParams } from 'react-router-dom'; // Assuming you're using React Router
import ProfileEdit from '../component/ProfileEdit';


const UserProfileOther = () => {
  const { userId } = useParams(); // Get the userId from the URL params
  console.log("ID: ", userId)
  const { store, actions } = useContext(Context);
  const { userProfile } = store

  useEffect(() => {
    console.log("User ID in UserProfileOther:", userId); // Check if userId is received correctly
    actions.fetchUserProfile(userId)
      .then(userProfileData => {
        console.log("User Profile Data in useEffect:", userProfileData); // Check if userProfileData is received correctly
      })
      .catch(error => console.error('Error fetching user profile:', error));
  }, [userId]);

  console.log("User Other Page:", userProfile);

  // Estado para controlar si estamos en modo de edición o no
  // const [isEditing, setIsEditing] = useState(false);

  // // Función para activar el modo de edición
  // const handleEditClick = () => {
  //   setIsEditing(true);
  // };

  return (
    <div>
      <h1>User Profile</h1>
      {/* {isEditing ? (
        <ProfileEdit />
      ) : ( */}
        {userProfile && (
          <div>
            <p>Username: {userProfile.username}</p>
            <p>Email: {userProfile.email}</p>
            <p>First name: {userProfile.first_name}</p>
            <p>Last name: {userProfile.last_name}</p>
            <p>Created Events: {userProfile.created_events.name}</p>
            <p>Signedup Events: {userProfile.signedup_event.name}</p>
            <p>Favorite Events: {userProfile.favorite_event.name}</p>

            {/* <button onClick={handleEditClick}>Edit Event</button> */}
            {/* Render other user profile information */}
          </div>
        )}
      {/* )} */}
    </div>
  );
};

export default UserProfileOther;
