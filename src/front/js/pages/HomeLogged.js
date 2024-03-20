// header, footer, searchEvents, eventos destacados, hero-info


import React from 'react';
import EventSearchBar from '../component/EventSearchBar';
import EventRecommended from '../component/EventRecommended';
import HeroSection from '../component/HeroSection';
import Logout from '../component/Logout';

const HomeLogged = () => {
  return (
    <div>
      <h1>Pagina loggeado</h1>
      <EventSearchBar />
      <EventRecommended />
      <HeroSection />
      <Logout />
    </div>
  );
};

export default HomeLogged;

