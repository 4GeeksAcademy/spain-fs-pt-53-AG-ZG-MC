// Action types
export const ActionTypes = {
    CREATE_EVENT: 'CREATE_EVENT',
    UPDATE_EVENT: 'UPDATE_EVENT',
    DELETE_EVENT: 'DELETE_EVENT',
  };
  
  // Action creators
  export const createEvent = (eventData) => ({
    type: ActionTypes.CREATE_EVENT,
    payload: eventData,
  });
  
  export const updateEvent = (eventId, eventData) => ({
    type: ActionTypes.UPDATE_EVENT,
    payload: { eventId, eventData },
  });
  
  export const deleteEvent = (eventId) => ({
    type: ActionTypes.DELETE_EVENT,
    payload: { eventId },
  });