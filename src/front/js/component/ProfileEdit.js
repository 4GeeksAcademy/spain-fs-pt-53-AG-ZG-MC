import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

// REVISAR PORQUE RENDERIZA CADA INPUT
// AÑADIR QUE SOLO EL PROPIETARIO DEL EVENTO PUEDA EDITAR (creo que ese es el problema)
// añadido al form la parte que estaba en el boton, da menos problemas
// creo que da error de cors porque solo el propietario puede hacerlo

const ProfileEdit = ({ user }) => {
  console.log("Profile edit:", user);

  const { actions } = useContext(Context);

  const [userData, setUserData] = useState({
    username: user.username,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log('Input changed:', name, value); // Agregar este console.log()
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Function to handle event update
  const handleUpdateUser = async () => {
    try {
      console.log('Updating user:', userData); // Agregar este console.log()
      await actions.editUserProfile(userData);
      console.log('Evento editado exitosamente');
    } catch (error) {
      console.error('Error al editar el evento:', error);
    }
  };

  // JSX - ATLAS
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
