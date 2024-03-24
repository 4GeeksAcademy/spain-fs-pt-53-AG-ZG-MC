import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';
import EditEvent from '../component/EventEdit';


const MyEvents = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const { user, events } = store;

  if (!user) return null;

  const { created_events, signedup_events } = user;

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [myCreatedEvents, setMyCreatedEvents] = useState(created_events);
  const [mySignedupEvents, setMySignedupEvents] = useState([]);

  useEffect(() => {
    setMyCreatedEvents(created_events);
  }, [created_events]);

  useEffect(() => {
    const signedupEventsWithDetails = signedup_events.map(signup => {
      const eventDetails = events.events.find(event => event.id === signup.event_id);
      return { ...signup, ...eventDetails };
    });
    setMySignedupEvents(signedupEventsWithDetails);
  }, [signedup_events, events]);

  useEffect(() => {
    setMyCreatedEvents(created_events);
    const signedupEventsWithDetails = signedup_events.map(signup => {
      const eventDetails = events.events.find(event => event.id === signup.event_id);
      return { ...signup, ...eventDetails };
    });
    setMySignedupEvents(signedupEventsWithDetails);
  }, [created_events, signedup_events, events]);

  const handleDeleteEvent = async (eventId) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this event?");
      if (confirmDelete) {
        await actions.deleteEvent(eventId);
        setSelectedEvent(null);
        
        const updatedEvents = myCreatedEvents.filter(event => event.id !== eventId);
        setMyCreatedEvents(updatedEvents);
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };
  

  const handleViewDetails = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  const handleCancelAssistence = async (eventId) => {
    try {
      await actions.cancelAssistance(eventId);
      const updatedEvents = mySignedupEvents.filter(event => event.id !== eventId);
      setMySignedupEvents(updatedEvents);
    } catch (error) {
      console.error('Error unsubscribing from event:', error);
    }
  };

  return (
    <div className="my-events">
      <h2>My Events</h2>

      <div>
        <h3>Events Created by You</h3>
        {myCreatedEvents.length === 0 ? (
          <p>No events created yet.</p>
        ) : (
          <ul>
            {myCreatedEvents.map(event => (
              <li key={event.id}>
                {event.name}
                <button onClick={() => handleViewDetails(event.id)}>View Details</button>
                <button onClick={() => setSelectedEvent(event)}>Edit</button>
                <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h3>Signedup Events</h3>
        {mySignedupEvents.length === 0 ? (
          <p>No events signed up yet.</p>
        ) : (
          <ul>
            {mySignedupEvents.map(event => (
              <li key={event.id}>
                {event.name}
                <button onClick={() => handleViewDetails(event.id)}>View Details</button>
                <button onClick={() => handleCancelAssistence(event.id)}>Unsubscribe</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedEvent && <EditEvent event={selectedEvent} />}
    </div>
  );
};

export default MyEvents;
