import React from 'react';
import { Link } from 'react-router-dom';
import EventImage from './../../img/evento1.webp';

const EventCard = ({ event }) => {
    if (!event) {
        return null;
    }

    const { id, userId, username, name, date, place } = event;


    return (
        
        <div className="event-card miniCardLog">
            <div className="imgMiniCard">
            <div style={{backgroundImage: `url(${EventImage})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "bottom"
                            }} className="d-block w-100 h-100 carouselBorder">
                        </div>
            </div>
            <h3 className="tittleMiniCard">{name}</h3>
            <p className="subtittleMiniCard">Date: {new Date(date).toDateString()}</p>
            <p className="subtittleMiniCard">Place: {place}</p>
            <Link to={`/events/${id}`}>
                <button className="buttonMiniCard">View Details</button>
            </Link>
            
        </div>
    );
};

export default EventCard;

