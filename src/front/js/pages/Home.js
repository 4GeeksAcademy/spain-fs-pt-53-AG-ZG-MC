import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../store/appContext';
import EventRecommended from '../component/EventRecommended';
import HeroSection from '../component/HeroSection';
import Login from '../component/Login';
import Logout from '../component/Logout';
import RegistrationForm from '../component/RegistrationForm';
import './../../styles/EventMiniCard.css';
import './../../styles/HeaderNavBrowser.css';
import './../../styles/footer.css';
import './../../styles/hero.css';
import './../../styles/registrationForm.css';


const Home = () => {
  const { actions, store } = useContext(Context);
  const [recommendedEvents, setRecommendedEvents] = useState([]);
  const [storeLog, setStoreLog] = useState({ session: { isLoggedIn: true, username: {}, userId: {}, accessToken: '' } });

  useEffect(() => {
    const fetchRecommendedEvents = async () => {
      try {
        const response = await actions.fetchEventRecommended();
        setRecommendedEvents(response);
      } catch (error) {
        console.error('Error fetching recommended events:', error);
      }
    };

    fetchRecommendedEvents();
  }, []);


  return (
    <div>
      {/*<h1>Página de inicio</h1>*/}
      {!store.session.isLoggedIn ? (
        // Si el usuario no está loggeado, mostrar componentes para no loggeado
        <>
          {/*<h3>Página de inicio sin estar loggeado</h3>*/}
          <EventRecommended events={recommendedEvents} />
          <HeroSection /> 
          {/* POR VER
          <Login />
          <RegistrationForm />
          */}
        </>
      ) : (
        // Si el usuario está loggeado, mostrar componentes para loggeado
        <>
          {/*<h3>Pagina loggeado</h3>*/}
          {/* <EventSearchBar /> */}
          {/* El EventSearchBar solo funciona en EvetListAllPage */}
          {/* Vamos a dejarlo fuera de la home!! */}
          <EventRecommended events={recommendedEvents} />
          <HeroSection />
        </>
      )}
    </div>
  );
};

export default Home;

