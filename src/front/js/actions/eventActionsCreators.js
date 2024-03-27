// Action types
export const ActionTypes = {
    CREATE_EVENT: 'CREATE_EVENT',
    UPDATE_EVENT: 'UPDATE_EVENT',
    DELETE_EVENT: 'DELETE_EVENT',
    CREATE_USER: 'CREATE_USER',
    UPDATE_USER: 'UPDATE_USER',
    DELETE_USER: 'DELETE_USER',
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

  export const createUser = (userData) => ({
    type: ActionTypes.CREATE_USER,
    payload: userData,
  });
  
  export const updateUser = (userId, userData) => ({
    type: ActionTypes.UPDATE_USER,
    payload: { userId, userData },
  });
  
  export const deleteUser = (userId) => ({
    type: ActionTypes.DELETE_USER,
    payload: { userId },
  });