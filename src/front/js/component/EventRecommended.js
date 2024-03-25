import React from 'react';
import EventCard from './EventCard';


const EventRecommended = ({ events }) => {

  if (!events || !Array.isArray(events)) {
    return <div>No events available</div>;
  }

  const limitedEvents = events.slice(0, 5);

  return (
    <div className="event-recommended">
      <h2>Recommended Events</h2>
      <div className="event-card-container">
        {limitedEvents.map(event => (
          <EventCard key={event.event.id} event={event.event} />
        ))}
      </div>
    </div>





<section className="sectionSpace">
<div className="centeredWebContent">
    <div className="miniCardSectionHeader">
        <h2 className="tittleHeaderWrap">¡Sal de tu zona de Comfort!</h2>
        <h4 className="subtittleHeaderWrap">Aquí te dejamos algunas opciones:</h4>
    </div>
    <div className="miniCardSectionWrap">
        <div className="miniCardLog">
            <div className="imgMiniCard"></div>
            <p className="tittleMiniCard">Titulo</p>
            <p className="subtittleMiniCard">Subtitulo masomenos pe pa probar saes aja ja ja</p>
            <button className="buttonMiniCard">Ver Evento</button>
        </div>
        <div className="miniCardLog">
            <div className="imgMiniCard"></div>
            <p className="tittleMiniCard">Titulo</p>
            <p className="subtittleMiniCard">Subtitulo masomenos pe pa probar saes aja ja ja</p>
            <button className="buttonMiniCard">Ver Evento</button>
        </div>
        <div className="miniCardLog">
            <div className="imgMiniCard"></div>
            <p className="tittleMiniCard">Titulo</p>
            <p className="subtittleMiniCard">Subtitulo masomenos pe pa probar saes aja ja ja</p>
            <button className="buttonMiniCard">Ver Evento</button>
        </div>
        <div className="miniCardLog">
            <div className="imgMiniCard"></div>
            <p className="tittleMiniCard">Titulo</p>
            <p className="subtittleMiniCard">Subtitulo masomenos pe pa probar saes aja ja ja</p>
            <button className="buttonMiniCard">Ver Evento</button>
        </div>
        <div className="miniCardLog">
            <div className="imgMiniCard"></div>
            <p className="tittleMiniCard">Titulo</p>
            <p className="subtittleMiniCard">Subtitulo masomenos pe pa probar saes aja ja ja</p>
            <button className="buttonMiniCard">Ver Evento</button>
        </div>
    </div>
    <div className="miniCardSectionButton">
        <button className="buttonMiniCard2">Registrate para ver y apuntarte a todos los eventos</button>
    </div>
</div>
</section>
  );
};

export default EventRecommended;
