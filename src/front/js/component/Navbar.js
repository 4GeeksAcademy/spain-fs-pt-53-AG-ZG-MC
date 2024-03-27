import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';
import Logout from './Logout';
import Login from './Login';
import RegistrationForm from './RegistrationForm';
import CreateEventPage from '../pages/CreateEventPage';
import UserProfileMine from '../pages/UserProfileMine';
import { Link } from 'react-router-dom';
import LOGO from './../../img/VIBING.webp';

const Navbar = () => {
  const { store } = useContext(Context);
  const [storeLog, setStoreLog] = useState({ session: { isLoggedIn: true, username: '', accessToken: '' } });

  


  return (
    
    <div>
      {!store.session.isLoggedIn ? (
        
        <>
        <div className="navAbsolute">
          <div id="webHeader2">
          <div id="centeredContent">
          <nav id="navbarNoLog1">
            <div id="brandNavbar">
              <img id="logo" src={LOGO} alt="Logo" />
            </div>
            <div id="buttonsNavbar">
            <Link to="/">
                      <button id="inicio">Home</button>
                    </Link>
                    
              <Link to="/login">
                <button id="login" className="btn">LOG IN</button>
              </Link>
              <Link to="/register">
                <button id="singup" className="btn">SIGN UP</button>
              </Link>
            </div>
          </nav>
          </div>
          </div>
          </div>
        </>
      ) : (
        
        <>
        <div className='navAbsolute'>
        <div id="webHeader2">
          <div id="centeredContent">
          <nav id="navbarNoLog1">
                  <div id="brandNavbar">
                    <img id="logo" src={LOGO} alt="Logo" />
                  </div>
                  <div id="buttonsNavbar2">
                  <Link to="/">
                      <button id="inicio">Home</button>
                    </Link>
                    <Link to="/events" >
                    <button id="inicio">Events</button>
                    </Link>
                      <div id="dropPerfil" className="dropdown">
                          <button id="perfil" className="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa-regular fa-user fa-xl" style={{color:'#fff'}}></i></button>
                          <ul className="dropdown-menu">
                              <div className="form-check">
                                <Link to="/profile" >
                                  <button id="verPerfil">View profile</button>
                                </Link>
                              </div>
                              <Logout setStoreLog={setStoreLog} />
                          </ul>
                      </div>
                      <Link to="/create-event">
                        <button id="create" className="btn">CREATE EVENT</button>
                      </Link>
                  </div>
              </nav>
              </div>
              </div>
              </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
