import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";


const ProfileEdit = ({ user }) => {
  const { actions } = useContext(Context);
  const [userData, setUserData] = useState({
    username: user.username,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Function to handle event update
  const handleUpdateUser = async () => {
    try {
      await actions.editUserProfile(userData);
      console.log('Evento editado exitosamente');
    } catch (error) {
      console.error('Error al editar el evento:', error);
    }
  };

  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={handleUpdateUser}>
        {/* User Name input */}
        <label htmlFor="username">Name:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={userData.username}
          onChange={handleInputChange}
        />

        {/* Event Duration input */}
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
        />

        {/* Event Type input */}
        <label htmlFor="first_name">First name:</label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          value={userData.first_name}
          onChange={handleInputChange}
          // readOnly
        />

        {/* Event Place input */}
        <label htmlFor="last_name">Last name:</label>
        <input
          type="text"
          id="last_name"
          name="last_name"
          value={userData.last_name}
          onChange={handleInputChange}
          // readOnly
        />

        {/* Submit button */}
        <button type="submit">
          Update Profile
        </button>

      </form>
    </div>
  );
};

export default ProfileEdit;
