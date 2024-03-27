import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../store/appContext';
import EventDetails from '../component/EventDetails';

const EventDetailsPage = () => {
  const { eventId } = useParams();
  const { store, actions } = useContext(Context);
  const { eventDetails, user } = store
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  
  const { signedup_events, id } = user || {};

  useEffect(() => {
    setIsLoggedIn(!!store.session.isLoggedIn);
  }, [store.session.isLoggedIn]);

  useEffect(() => {
    actions.fetchEventDetails(eventId)
      .then(eventData => {
        
      })
      .catch(error => console.error('Error fetching event:', error));
  }, [eventId]);

  
  const handleSignUp = async () => {
    try {
      
      if (!isLoggedIn) {
        alert('You need to log in first.');
        return;
      }
      if (signedup_events && signedup_events.find(event => event.event_id == eventId)) {
        await actions.cancelAssistance(eventId)
      } else {
        await actions.signUpForEvent(eventId, id);
      }
      await actions.fetchUserProfile();
      
    } catch (error) {
      console.error('Error signing up for the event', error);
    }
  };
  

  const whatsappMessage = `¡Check out this event!! ${window.location.href}`;

  return (
    <div>
      {eventDetails && (
        <div>
          <EventDetails event={eventDetails} />
          <div className='SBC'>
          <div className='SeparationButtons'>
          <button className='buttonMiniCard3 w-t' onClick={handleSignUp}>
            {signedup_events && signedup_events.find(event => event.event_id == eventId) ? "Cancel" : "Sign up"}
          </button>
          <button className='buttonMiniCard3'>
            <a className='w-t' href={`https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappMessage)}`} target="_blank" rel="noopener noreferrer">Compartir en WhatsApp</a>
          </button>
          </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetailsPage;

