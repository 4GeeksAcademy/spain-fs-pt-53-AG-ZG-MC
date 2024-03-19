// HomePageNotLoggedIn.js
// header, footer, searchEvents, eventos destacados, hero-info

import React from 'react';
import EventRecommended from '../component/EventRecommended';
import LoginPasswordRecovery from '../component/LoginPasswordRecovery';
import RegistrationForm from '../component/RegistrationForm';


const HomePageNotLogged = () => {
  return (
    <div>
      <h1>Página de inicio sin estar loggeado</h1>
      <EventRecommended />
      <LoginPasswordRecovery />
      {/* <RegistrationForm /> */}
    </div>
  );
};

export default HomePageNotLogged;

