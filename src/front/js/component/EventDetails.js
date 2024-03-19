import React from "react";

//ver ubicacion del evento en mapa con api
//ver el clima API - componente separado
//VER Nº de asistentes

const EventDetails = ({ event }) => {
  console.log("Event Details:", event)

  if (!event) {
    return null; // Si no hay evento, retorna null para evitar errores
  }

  const { id, name, date, duration, description } = event;

  // JSX component - Atlas
  return (
    <div>
      <h2>Event Details</h2>
      {event && (
        <div>
          <h3>{id}, {name}</h3>
          <p>Date: {date}</p>
          <p>Duration: {duration}</p>
          <p>Description: {description}</p>

          {/* assuming weather forecast needs location to fetch weather, 
          from separate component */}
          {/* <WeatherForecast location={eventDetails.location} />
          <p>Attendees Count: {attendeesCount}</p>
          <EventActions eventId={eventId} /> */}
        </div>
      )}
    </div>
  );
};

export default EventDetails;
