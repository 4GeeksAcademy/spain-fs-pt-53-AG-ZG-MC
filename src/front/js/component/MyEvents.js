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
      const eventDetails = events.find(event => event.id === signup.event_id);
      return { ...signup, ...eventDetails };
    });
    setMySignedupEvents(signedupEventsWithDetails);
  }, [signedup_events, events]);

  useEffect(() => {
    setMyCreatedEvents(created_events);
    const signedupEventsWithDetails = signedup_events.map(signup => {
      const eventDetails = events.find(event => event.id === signup.event_id);
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
      <div className='tittleCentered'>
      <h2 className='tittleHeaderWrap'>My Events</h2>
      </div>

      <div>
        <h3 className='tittleMiniCard'>Events Created by You</h3>
        <div className='sectionSpaceList'>
        <div className='centeredWebContent'>
        <div className="event-list miniCardSectionWrapList">
        {myCreatedEvents.length === 0 ? (
          <p>No events created yet.</p>
        ) : (
          <ul className='MyEventsUlFlex'>
            {myCreatedEvents.map(event => (
              <li className='eventEditProfile bg-w' key={event.id}>
                <div className='TextProfileEvent'>{event.name}</div>
                <div className='TextProfileEvent2'>{new Date(event.date).toLocaleDateString()}</div>
                <button className='profileButtons' onClick={() => handleViewDetails(event.id)}>View Details</button>
                <button className='profileButtons' onClick={() => setSelectedEvent(event)}>Edit</button>
                <button className='profileButtons' onClick={() => handleDeleteEvent(event.id)}>Delete</button>
              </li>
            
            ))}
          </ul>
        )}
        </div>
        </div>
        </div>
      </div>

      <div>
        <h3 className='tittleMiniCard'>Signedup Events</h3>
        <div className='sectionSpaceList'>
        <div className='centeredWebContent'>
        <div className="event-list miniCardSectionWrapList">
        {mySignedupEvents.length === 0 ? (
          <p>No events signed up yet.</p>
        ) : (
          <ul className='MyEventsUlFlex'>
            {mySignedupEvents.map(event => (
              <li className='eventEditProfile bg-w' key={event.id}>
                <div className='TextProfileEvent'>{event.name}</div>
                <div className='TextProfileEvent2'>{new Date(event.date).toLocaleDateString()}</div>
                <button className='profileButtons' onClick={() => handleViewDetails(event.id)}>View Details</button>
                <button className='profileButtons' onClick={() => handleCancelAssistence(event.id)}>Unsubscribe</button>
              </li>
            ))}
          </ul>
        )}
        </div>
        </div>
        </div>

      </div>

      {selectedEvent && <EditEvent event={selectedEvent} />}
    </div>
  );
};

export default MyEvents;
