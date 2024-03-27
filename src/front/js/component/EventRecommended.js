import React from 'react';
import EventCard from './EventCard';
import { Link } from 'react-router-dom';

const EventRecommended = ({ events }) => {

  if (!events || !Array.isArray(events)) {
    return <div>No events available</div>;
  }

  const limitedEvents = events.slice(0, 5);

  return (


    <section className="sectionSpace event-recommended">
    <div className="centeredWebContent">
        <div className="miniCardSectionHeader">
            <h2 className="tittleHeaderWrap">Get out of your comfort zone!</h2>
            <h4 className="subtittleHeaderWrap">Here we leave you some options:</h4>
        </div>
        <div className="miniCardSectionWrap sectionCardMargin">
        <div className="event-card-container miniCardSectionWrap">
        {limitedEvents.map(event => (
          <EventCard key={event.event.id} event={event.event} />
        ))}
      </div>
        </div>
        <div className="miniCardSectionButton">
        <Link to="/events" >
        <button className="buttonMiniCard2">Find out the available events!</button>
          </Link>
        </div>
    </div>
    </section>


  );
};

export default EventRecommended;
