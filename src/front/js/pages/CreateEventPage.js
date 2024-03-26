import React, { useContext } from 'react';
import EventCreate from '../component/EventCreate';
import { Context } from '../store/appContext';


const CreateEventPage = () => {
  const { store, actions } = useContext(Context);
  const { events } = store

  return (
    <div>
      <h1>Create Event</h1>
      <EventCreate />
    </div>
  );
};

export default CreateEventPage;
