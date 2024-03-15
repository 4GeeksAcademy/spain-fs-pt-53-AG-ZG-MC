// HomePageNotLoggedIn.js
// header, footer, searchEvents, eventos destacados, hero-info

import React from 'react';
import Header from '../component/Header';
import Footer from '../component/Footer';
import EventRecommended from '../component/EventRecommended';
import LoginPasswordRecovery from '../component/LoginPasswordRecovery';
import RegistrationForm from '../component/RegistrationForm';


const HomePageNotLogged = () => {
  return (
    <div>
      <Header />
      <p>Home Logged In</p>
      <EventRecommended />
      <LoginPasswordRecovery />
      {/* <RegistrationForm /> */}
      <Footer />
    </div>
  );
};

export default HomePageNotLogged;

