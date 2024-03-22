import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';
import Logout from './Logout';
import LoginPasswordRecovery from './LoginPasswordRecovery';
import RegistrationForm from './RegistrationForm';
import CreateEventPage from '../pages/CreateEventPage';
import UserProfileMine from '../pages/UserProfileMine';

const Navbar = () => {
  const { store } = useContext(Context);
  const [storeLog, setStoreLog] = useState({ session: { isLoggedIn: true, username: '', accessToken: '' } });

  // console.log("session: ", store.session)
  
  return (
    <div>
      <h1>Navbar</h1>
      {!store.session.isLoggedIn ? (
        // Si el usuario no está loggeado, mostrar componentes para no loggeado
        <>
          <h3>Navbar sin estar loggeado</h3>
          <LoginPasswordRecovery />
          {/* <RegistrationForm /> */}
        </>
      ) : (
        // Si el usuario está loggeado, mostrar componentes para loggeado
        <>
          <h3>Navbar loggeado</h3>
          <Logout setStoreLog={setStoreLog} />
          <UserProfileMine />
          <CreateEventPage />
        </>
      )}
    </div>
  );
};

export default Navbar;
