import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import EventCard from '../component/EventCard';
import EventSearchBar from '../component/EventSearchBar';


const EventsListAll = () => {
  const { store } = useContext(Context);
  const { events } = store
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [filteredEvents]);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/events`);
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await response.json();
      setFilteredEvents(data.events || []);
    } catch (error) {
      console.error('Error fetching events:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterClick = (filters) => {
    setFilteredEvents(events.events);
  };
  
  return (
    <div>
      <div>
        <EventSearchBar
          events={events}
          setFilteredEvents={setFilteredEvents}
          onFilterClick={handleFilterClick}
        />
      </div>

      <div>
        <h1>All Events</h1>
        {loading ? ( 
          <p>Loading...</p>
        ) : (
          <div className="event-list">
            {filteredEvents.length > 0 ? (
              filteredEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <p>No events found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );

};

export default EventsListAll;

