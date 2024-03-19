import React from "react";
import WeatherForecast from "./WeatherForecast";

//ver ubicacion del evento en mapa con api
//ver el clima API - componente separado
//VER Nº de asistentes

const EventDetails = ({ event }) => {
  console.log("Event Details:", event)

  if (!event) {
    return null; // Si no hay evento, retorna null para evitar errores
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
    user_id  
  } = event;

  const eventDateFormatted = new Date(date).toISOString().split('T')[0];

  // JSX component - Atlas
  return (
    <div>
      <h2>Event Details</h2>
      {event && (
        <div>
          <h3>{id}, {name}</h3>
          <p>Date: {date}</p>
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
          <p>Lgtbi: {lgtbi}</p>
          <p>Pets: {pet_friendly}</p>
          <p>Kids: {kid_friendly}</p>
          <p>User ID: {user_id}</p>
          {/* assuming weather forecast needs location to fetch weather, 
          from separate component */}
          <WeatherForecast location={event.place} eventDate={eventDateFormatted} />
          {/* <p>Attendees Count: {attendeesCount}</p>
          <EventActions eventId={eventId} /> */}
        </div>
      )}
    </div>
  );
};

export default EventDetails;
