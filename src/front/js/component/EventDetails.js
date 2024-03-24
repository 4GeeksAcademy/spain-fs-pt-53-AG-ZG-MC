import React from "react";
import WeatherForecast from "./WeatherForecast";


const EventDetails = ({ event }) => {
  console.log("Event Details:", event)

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
    <div>
      <h2>Event Details</h2>
      {event && (
        <div>
          <h3>{id}, {name}</h3>
          <p>Date: {new Date(date).toDateString()}</p>
          <p>Duration: {duration}</p>
          <p>Type: {type}</p>
          <p>Place: {place}</p>
          <p>Description: {description}</p>
          <p>Language: {language}</p>
          <p>Gender: {gender}</p>
          <p>Price type: {price_type}</p>
          <p>Price: {price}</p>
          <p>Minimum age: {min_age}</p>
          <p>Maximun age: {max_age}</p>
          <p>Minimum people: {min_people}</p>
          <p>Maximum people: {max_people}</p>
          <p>Lgtbi: {lgtbi ? 'Allowed' : 'Not Allowed'}</p>
          <p>Pets: {pet_friendly  ? 'Allowed' : 'Not Allowed'}</p>
          <p>Kids: {kid_friendly ? 'Allowed' : 'Not Allowed'}</p>

          <WeatherForecast location={event.place} eventDate={eventDateFormatted} />
          <iframe
          width="600"
          height="450"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDB9WpSu4YZXGeyeD72uuxNKM-kBpDBaCI&q=${encodeURIComponent(event.place)}`}
          title="Event map"
        ></iframe>
        </div>
      )}
    </div>
  );
};

export default EventDetails;
