import React from "react";
import WeatherForecast from "./WeatherForecast";
import './../../styles/registrationForm.css';
import EventImage from './../../img/evento1.webp';

const EventDetails = ({ event }) => {
  

  if (!event) {
    return null; 
  }

  const { 
    id, 
    name, 
    date, 
    duration, 
    type, 
    place, 
    description,
    language,
    gender,
    price_type,
    price,
    min_age,
    max_age,
    min_people,
    max_people,
    lgtbi,
    kid_friendly,
    pet_friendly,
  } = event;

  const eventDateFormatted = new Date(date).toISOString().split('T')[0];

  return (
    <div className="createbarPosition">
    <div className="createbarContainer FlexColumn">
      <div className="tittleHeaderWrap CenteredText"><h2 className="FontSize30">Event Details</h2></div>
      {event && (
        <div className="EventDetailsContainer">
          <div className="WrapDivs">
            <div className="ImgEventDetail" style={{backgroundImage: `url(${EventImage})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}>
            </div>
          
          <div>
          <h3 className="TittleEventDetail">{name}</h3>
          <p className="pMargin0 subtittleMiniCard">Date: {new Date(date).toDateString()}</p>
          <p className="pMargin0 subtittleMiniCard">Duration: {duration}</p>
          <p className="pMargin0 subtittleMiniCard">Type: {type}</p>
          <p className="pMargin0 subtittleMiniCard">Place: {place}</p>
          <p className="pMargin0 subtittleMiniCard">Description: {description}</p>
          <p className="pMargin0 subtittleMiniCard">Language: {language}</p>
          <p className="pMargin0 subtittleMiniCard">Gender: {gender}</p>
          <p className="pMargin0 subtittleMiniCard">Price type: {price_type}</p>
          <p className="pMargin0 subtittleMiniCard">Price: {price}</p>
          <p className="pMargin0 subtittleMiniCard">Minimum age: {min_age}</p>
          <p className="pMargin0 subtittleMiniCard">Maximun age: {max_age}</p>
          <p className="pMargin0 subtittleMiniCard">Minimum people: {min_people}</p>
          <p className="pMargin0 subtittleMiniCard">Maximum people: {max_people}</p>
          <p className="pMargin0 subtittleMiniCard">Lgtbi: {lgtbi ? 'Allowed' : 'Not Allowed'}</p>
          <p className="pMargin0 subtittleMiniCard">Pets: {pet_friendly  ? 'Allowed' : 'Not Allowed'}</p>
          <p className="pMargin0 subtittleMiniCard">Kids: {kid_friendly ? 'Allowed' : 'Not Allowed'}</p>
          </div>
          </div>
          <WeatherForecast location={event.place} eventDate={eventDateFormatted} />
          <div className="CenteredText">
          <iframe 
          width="600"
          height="450"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDB9WpSu4YZXGeyeD72uuxNKM-kBpDBaCI&q=${encodeURIComponent(event.place)}`}
          title="Event map">
        </iframe>
        </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default EventDetails;
