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

  
  const handleUpdateUser = async () => {
    try {
      await actions.editUserProfile(userData);
      
    } catch (error) {
      
    }
  };

  return (
    <div>
      <h2 className="EditProfileText">Edit User</h2>
      <form onSubmit={handleUpdateUser}>
       
        <label htmlFor="username">Name:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={userData.username}
          onChange={handleInputChange}
        />

     
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
        />

     
        <label htmlFor="first_name">First name:</label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          value={userData.first_name}
          onChange={handleInputChange}
          
        />

       
        <label htmlFor="last_name">Last name:</label>
        <input
          type="text"
          id="last_name"
          name="last_name"
          value={userData.last_name}
          onChange={handleInputChange}
          
        />

        <button className="EditButton" type="submit">
          Update Profile
        </button>

      </form>
    </div>
  );
};

export default ProfileEdit;
