{/* eventos favoritos, creados, a los que asisto */ }
import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext';
import EditEvent from '../component/EventEdit';


const MyEvents = () => {
  const { store, actions } = useContext(Context);
  const { user } = store;
  if (!user) return null;
  const { created_events, signedup_events, favorite_event } = user;

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [myCreatedEvents, setMyCreatedEvents] = useState(created_events);


  useEffect(() => {
    setMyCreatedEvents(created_events);
  }, [created_events]);

  const handleDeleteEvent = async (eventId) => {
    try {
      await actions.deleteEvent(eventId);
      setSelectedEvent(null);
      // Actualizar la lista de eventos creados después de eliminar un evento
      const updatedEvents = myCreatedEvents.filter(event => event.id !== eventId);
      setMyCreatedEvents(updatedEvents);
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  // return null;
  //JSX - ATLAS
  return (
    <div className="my-events">
      <h2>My Events</h2>

      <div>
        <h3>Events Created by You</h3>
        <ul>
          {myCreatedEvents.map(event => (
            <li key={event.id}>
              {event.name}
              <button onClick={() => setSelectedEvent(event)}>Edit</button>
              <button onClick={() => handleDeleteEvent(event.id)}>Delete</button> {/* Botón para eliminar el evento */}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Signedup Events</h3>
        <ul>
          {signedup_events.map(event => (
            <li key={event.id}>{event.name}</li>
          ))}
        </ul>
      </div>

      {/* <div>
        <h3>Events You Signed Up For</h3>
        <ul>
          {favorite_event.map(event => (
            <li key={event.id}>{event.name}</li>
          ))}
        </ul>
      </div> */}
      {selectedEvent && <EditEvent event={selectedEvent} />}
    </div>
  );
};

export default MyEvents;
