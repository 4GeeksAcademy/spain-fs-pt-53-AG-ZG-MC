// EventView.js

// LA FECHA NO SE TRAE, SALE VACIA
// NO SE PUEDEN GUARDAR LOS CAMBIOS DEL EVENTO POR CORS

import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../store/appContext';
import EventDetails from '../component/EventDetails';

const EventDetailsPage = () => {
  const { eventId } = useParams(); // Get the event ID from URL params
  const { store, actions } = useContext(Context);
  const { eventDetails } = store

  useEffect(() => {
    actions.fetchEventDetails(eventId)
      .then(eventData => console.log('Event fetched:', eventData))
      .catch(error => console.error('Error fetching event:', error));
  }, [eventId]);

  // console.log("Events Details Page:", eventDetails);

  // // Estado para controlar si estamos en modo de edición o no
  // const [isEditing, setIsEditing] = useState(false);

  // // Función para activar el modo de edición
  // const handleEditClick = () => {
  //   setIsEditing(true);
  // };

  return (
    <div>
      <h1>Event Details Page</h1>
        {eventDetails && (
          <EventDetails event={eventDetails} />
        )}
    </div>
  );
};

export default EventDetailsPage;

