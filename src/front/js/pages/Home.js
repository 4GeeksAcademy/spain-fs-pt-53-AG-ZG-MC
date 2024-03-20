// HomePageNotLoggedIn.js
// header, footer, searchEvents, eventos destacados, hero-info

import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../store/appContext';
import EventSearchBar from '../component/EventSearchBar';
import EventRecommended from '../component/EventRecommended';
import HeroSection from '../component/HeroSection';
import LoginPasswordRecovery from '../component/LoginPasswordRecovery';
import Logout from '../component/Logout';

const HomeNotLogged = () => {
  const { actions, store } = useContext(Context);
  const [recommendedEvents, setRecommendedEvents] = useState([]);
  const [storeLog, setStoreLog] = useState({ session: { isLoggedIn: true, user: {}, accessToken: '' } });

  useEffect(() => {
    const fetchRecommendedEvents = async () => {
      try {
        const response = await actions.fetchEventRecommended();
        console.log('Recommended events response:', response); // Agrega un console.log para verificar los datos
        setRecommendedEvents(response);
      } catch (error) {
        console.error('Error fetching recommended events:', error);
      }
    };

    fetchRecommendedEvents();
  }, []);

  return (
    <div>
      <h1>Página de inicio</h1>
      {!store.session.isLoggedIn ? (
        // Si el usuario no está loggeado, mostrar componentes para no loggeado
        <>
          <h3>Página de inicio sin estar loggeado</h3>
          <EventRecommended events={recommendedEvents} />
          <LoginPasswordRecovery />
          {/* <RegistrationForm /> */}
        </>
      ) : (
        // Si el usuario está loggeado, mostrar componentes para loggeado
        <>
          <h3>Pagina loggeado</h3>
          <EventSearchBar />
          <EventRecommended events={recommendedEvents} />
          <HeroSection />
          <Logout setStoreLog={setStoreLog} />
        </>
      )}
    </div>
  );
};

export default HomeNotLogged;

