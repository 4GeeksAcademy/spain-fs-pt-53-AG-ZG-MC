// UserProfileMine.js
//actualizar perfil usuario
//eliminar cuenta usuario
//ver eventos que he creado

import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import ProfileEdit from '../component/ProfileEdit';
import MyEvents from '../component/MyEvents';

const UserProfileMine = () => {
  const { store, actions } = useContext(Context);
  const [userProfile, setUserProfile] = useState(null);

  // console.log("Store id:", store.session)

  useEffect(async () => {
    console.log("User profile effect triggered");
    try {
      console.log("Editing user profile...");
      const userProfile = await actions.fetchUserProfile();
      setUserProfile(userProfile); // Actualiza userProfile con los datos actualizados del perfil
      // Optionally, update state or show success message
      console.log("User profile updated:", userProfile);
    } catch (error) {
      console.error('Error editing user profile:', error);
      // Handle error
    }
  }, []);


  // console.log("UserProfile fuera:", userProfile);

  // Estado para controlar si estamos en modo de edición o no
  const [isEditing, setIsEditing] = useState(false);

  // Función para activar el modo de edición
  const handleEditClick = () => {
    setIsEditing(true);
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
            {/* FIRST Y LAST NAME NO SE DEJAN EDITAR BIEN */}
            <p>First name: {userProfile.first_name}</p>
            <p>Last name: {userProfile.last_name}</p>
            <MyEvents />
            {/* <p>Created Events: {userProfile.created_events.name}</p>          */}
            {/* COMPROBAR POR QUÉ DA ERROR */}
            {/* <p>Signedup Events: {userProfile.signedup_event.name}</p> */}
            {/* <p>Favorite Events: {userProfile.favorite_event.name}</p> */}

            <button onClick={handleEditClick}>Edit Profile</button>
          </div>
        )
      )}
    </div>
  );
};

export default UserProfileMine;


