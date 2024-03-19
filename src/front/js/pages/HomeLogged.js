// HomePageLoggedIn.js
// header, footer, searchEvents, eventos destacados, hero-info


import React from 'react';
import Header from '../component/Header';
import Footer from '../component/Footer';
import EventSearchBar from '../component/EventSearchBar';
import EventRecommended from '../component/EventRecommended';
import HeroSection from '../component/HeroSection';

const HomeLoggedIn = () => {
  return (
    <div>
      <h1>Pagína loggeado</h1>
      <EventSearchBar />
      <EventRecommended />
      <HeroSection />
    </div>
  );
};

export default HomeLoggedIn;

