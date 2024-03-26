import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../store/appContext';
import EventDetails from '../component/EventDetails';

const EventDetailsPage = () => {
  const { eventId } = useParams();
  const { store, actions } = useContext(Context);
  const { eventDetails, user } = store
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log("User: ", user);
  const { signedup_events, id } = user || {};

  useEffect(() => {
    setIsLoggedIn(!!store.session.isLoggedIn);
  }, [store.session.isLoggedIn]);

  useEffect(() => {
    actions.fetchEventDetails(eventId)
      .then(eventData => {
        console.log('Event fetched:', eventData);
      })
      .catch(error => console.error('Error fetching event:', error));
  }, [eventId]);

  // Función para manejar la inscripción en el evento
  const handleSignUp = async () => {
    try {
      console.log('Starting handleSignUp...');
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
      console.log('Signed up for event successfully');
    } catch (error) {
      console.error('Error signing up for the event', error);
    }
  };
  console.log("Signedup Events: ", signedup_events)

  const whatsappMessage = `¡Check out this event!! ${window.location.href}`;

  return (
    <div>
      <h1>Event Details Page</h1>
      {eventDetails && (
        <div>
          <EventDetails event={eventDetails} />
          <button onClick={handleSignUp}>
            {signedup_events && signedup_events.find(event => event.event_id == eventId) ? "Cancel" : "Sign up"}
          </button>
          <button>
            <a href={`https:api.whatsapp.com/send?text=${encodeURIComponent(whatsappMessage)}`} target="_blank" rel="noopener noreferrer">Compartir en WhatsApp</a>
          </button>
        </div>
      )}
    </div>
  );
};

export default EventDetailsPage;

