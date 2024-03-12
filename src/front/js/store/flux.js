const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			events: [], // Add an empty array to store events
		},
		actions: {
			// Other actions...
			handleCreateUser: async (username, password) => {
				try {
					// Implement the logic to create a user in the backend
					const response = await fetch(process.env.BACKEND_URL + "/api/createUser", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ username, password }),
					});

					if (!response.ok) {
						throw new Error("Error creating user");
					}

					// Optionally, handle the response data or update the store
					const data = await response.json();
					console.log("User created successfully:", data);
				} catch (error) {
					console.error("Error creating user", error);
					throw error; // Propagate the error to the caller if needed
				}
			},

			getMessage: async () => {
				try {
					// Implement the logic to fetch the message from the backend
					const response = await fetch(process.env.BACKEND_URL + "/api/message");
					const data = await response.json();
					setStore({ message: data }); // Set the fetched message in the store
					return data;
				} catch (error) {
					console.error("Error fetching message from backend", error);
				}
			},

			fetchEventRecommended: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/events");
					const data = await response.json();
					setStore({ events: data }); // Set the fetched events in the store
					return data;
				} catch (error) {
					console.error("Error fetching events from backend", error);
				}
			},

			signUpForEvent: async (eventId) => {
				try {
					//correct backend logic as needed to signup for event
					const response = await fetch(`${process.env.BACKEND_URL}/api/events/${eventId}/signup`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						// include any other data we need
					});
					if (!response.ok) {
						throw new Error('Failed to sign up for the event');
					}
					console.log(`Signed up for event ${eventId}`);
				} catch (error) {
					console.error('Error signing up for the event', error);
					throw error;
				}
			},

			cancelAssistance: async (eventId) => {
				try {
					// correct backend logic to cancel assistance
					const response = await fetch(`${process.env.BACKEND_URL}/api/events/${eventId}/cancel-assistance`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						//include any other data we may need
					});
					if (!response.ok) {
						throw new Error('Failed to cancel assistance for the event');
					}
					console.log(`Canceled assistance for event ${eventId}`);
				} catch (error) {
					console.error('Error canceling assistance for the event', error);
					throw error;
				}
			},

			shareEvent: async (eventId) => {
				try {
					// do we need backend logic to share event??
					console.log(`Shared event ${eventId}`);
				} catch (error) {
					console.error("Error sharing the event", error);
				}
			},

			fetchEventDetails: async (eventId) => {
				try {
					//correct backend logic as needed to fetch EventDetails
					const response = await fetch(process.env.BACKEND_URL + `/api/events/${eventId}`);
					const data = await response.json();
					setStore({ eventDetails: data }); // Set the fetched event details in the store
					return data;
				} catch (error) {
					console.error(`Error fetching event details for event ${eventId}`, error);
				}
			},

			getAttendeesCount: async (eventId) => {
				try {
					// coorect backend logic to fetch number of attendees for the event
					const response = await fetch(`${process.env.BACKEND_URL}/api/events/${eventId}/attendees/count`);
					if (!response.ok) {
						throw new Error('Failed to fetch attendees count');
					}
					const data = await response.json();
					console.log(`Attendees count for event ${eventId}:`, data.count);
					return data.count;
				} catch (error) {
					console.error("Error fetching attendees count", error);
					throw error; // Propagate the error to the caller if needed
				}
			},
		},
	};
};

export default getState;
