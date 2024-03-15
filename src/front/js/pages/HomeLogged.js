// HomePageLoggedIn.js
// header, footer, searchEvents, eventos destacados, hero-info


import React from 'react';
import Header from '../component/Header';
import Footer from '../component/Footer';
import EventSearchBar from '../component/EventSearchBar';
import EventRecommended from '../component/EventRecommended';
import HeroSection from '../component/HeroSection';

const HomePageLoggedIn = () => {
  return (
    <div>
      <Header />
      <p>Home Logged In</p>
      <EventSearchBar />
      <EventRecommended />
      <HeroSection />
      <Footer />
    </div>
  );
};

export default HomePageLoggedIn;

