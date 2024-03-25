import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';
import Logout from './Logout';
import Login from './Login';
import RegistrationForm from './RegistrationForm';
import CreateEventPage from '../pages/CreateEventPage';
import UserProfileMine from '../pages/UserProfileMine';

const Navbar = () => {
  const { store } = useContext(Context);
  const [storeLog, setStoreLog] = useState({ session: { isLoggedIn: true, username: '', accessToken: '' } });

  
  return (
    <div>
      <h1>Navbar</h1>
      {!store.session.isLoggedIn ? (
        // Si el usuario no está loggeado, mostrar componentes para no loggeado
        <>
          <h3>Navbar sin estar loggeado</h3>
          <Login />
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

  return (
    <div>
      {!store.session.isLoggedIn ? (
        // Si el usuario no está loggeado, mostrar componentes para no loggeado
        <>
          <nav id="navbarNoLog1">
                  <div id="brandNavbar">
                      <img id="logo" src="../LOGO.svg" alt="Logo"></img>
                  </div>
                  <div id="buttonsNavbar">
                      <button id="inicio">Inicio</button>
                      <button id="destacados">Destacados</button>
                      <button id="info">Info</button>
                      <div id="dropPerfil" className="dropdown">
                          <button id="perfil" className="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="width: 100%; height: 100%;"><i className="fa-regular fa-user fa-xl" style="color: #ffffff;"></i></button>
                          <ul className="dropdown-menu">
                              <div className="form-check">
                                  <button id="verPerfil">Ver perfil</button>
                              </div>
                              <div className="form-check">
                                  <button id="cerrarSesion">Cerrar sesión</button>
                              </div>
                          </ul>
                      </div>
                      <button id="create" className="btn">CREATE EVENT</button>
                  </div>
              </nav>
        </>
      ) : (
        // Si el usuario está loggeado, mostrar componentes para loggeado
        <>
          <nav id="navbarNoLog1">
            <div id="brandNavbar">
              <img id="logo" src="../LOGO.svg" alt="Logo" />
            </div>
            <div id="buttonsNavbar">
              <button id="inicio">Inicio</button>
              <button id="destacados">Destacados</button>
              <button id="info">Info</button>
              <button id="login" className="btn">LOG IN</button>
              <button id="singup" className="btn">SING UP</button>
            </div>
          </nav>
        </>
      )}
    </div>
  );
};

export default Navbar;
