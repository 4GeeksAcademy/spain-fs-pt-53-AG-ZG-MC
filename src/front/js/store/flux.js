const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			events: [], // Add an empty array to store events
			session: {
				isLoggedIn: false,
				user: null,
				accessToken: null,
				// Add other session-related data as needed
			},
			passwordRecovery: {
				isPasswordRecoverySent: false,
				error: null,
			},
		},
		actions: {
			// Other actions?...

			login: async (username, password) => {
				try {
					// Implement logic to authenticate user
					// Set session state if authentication is successful
					//Replace the placeholder URL (process.env.BACKEND_URL) with the actual endpoints 
					const response = await fetch(`${process.env.BACKEND_URL}/api/auth/login`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ username, password }),
					});

					if (!response.ok) {
						throw new Error('Failed to login');
					}

					const data = await response.json();
					const accessToken = data.accessToken; // Assuming the token is returned as 'accessToken'

					// Store the access token in local storage or a secure location
					localStorage.setItem('accessToken', accessToken);

					// Set session state if authentication is successful
					setStore(prevState => ({
						...prevState,
						session: {
							isLoggedIn: true,
							user: { username }, // Store user data as needed
							accessToken: accessToken,
							// Add other user-related data as needed
						}
					}));
				} catch (error) {
					console.error('Error logging in:', error);
					throw error;
				}
			},

			logout: () => {
				// Logic to clear session state upon logout
				setStore(prevState => ({
					...prevState,
					session: {
						isLoggedIn: false,
						user: null,
						accessToken: null,
					},
				}));
			},

			initiatePasswordRecovery: async (username) => {
				try {
					// Logic to initiate password recovery process
					// Update passwordRecovery state based on the outcome
					setStore(prevState => ({
						...prevState,
						passwordRecovery: {
							isPasswordRecoverySent: true,
							error: null,
						},
					}));
				} catch (error) {
					console.error('Error initiating password recovery:', error);
					// Update passwordRecovery state with error information if needed
					setStore(prevState => ({
						...prevState,
						passwordRecovery: {
							isPasswordRecoverySent: false,
							error: error.message,
						},
					}));
					throw error;
				}
			},

			clearPasswordRecoveryState: () => {
				// Clear passwordRecovery state after password recovery process is complete or cancelled
				setStore(prevState => ({
					...prevState,
					passwordRecovery: {
						isPasswordRecoverySent: false,
						error: null,
					},
				}));
			},

			handleCreateUser: async (username, password) => {
				try {
					// Implement the logic to create a user in the backend
					//replace API url with correct one
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

			createEvent: async (newEvent) => {
				try {
					// Implement logic to create a new event in the backend
					const response = await fetch(process.env.BACKEND_URL + "/api/createEvent", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(newEvent),
					});

					if (!response.ok) {
						throw new Error("Error creating event");
					}

					// Optionally, handle the response data or update the store
					const data = await response.json();
					console.log("Event created successfully:", data);

					// Update the store to include the newly created event:
					setStore(prevState => {
						return { ...prevState, events: [...prevState.events, data] };
					});

				} catch (error) {
					console.error("Error creating event", error);
					throw error;
				}
			},

			editEvent: async (eventId, updatedEvent) => {
				try {
					// logic to update the existing event in the backend, Replace API
					const response = await fetch(`${process.env.BACKEND_URL}/api/events/${eventId}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(updatedEvent),
					});

					if (!response.ok) {
						throw new Error("Error updating event");
					}

					// handle the response data or update the store
					const data = await response.json();
					console.log("Event updated successfully:", data);

					// Update the store to reflect the updated event
					setStore(prevState => {
						const updatedEvents = prevState.events.map(event => {
							if (event.id === eventId) {
								return { ...event, ...data };
							}
							return event;
						});
						return { ...prevState, events: updatedEvents };
					});

				} catch (error) {
					console.error("Error updating event", error);
					throw error;
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

			signUpForEvent: async (eventId) => {
				try {
					//correct backend logic as needed to signup for event
					//replace the placeholder URL (${process.env.BACKEND_URL}/api/user/profile) 
					// with the actual endpoint of backend API that handles user profile updates.
					const response = await fetch(`${process.env.BACKEND_URL}/api/events/${eventId}/signup`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						// include any other data we need
					});

					//checks if request was successful:
					if (!response.ok) {
						throw new Error('Failed to sign up for the event');
					}

					// handle the response data if needed
					//console.log(`Signed up for event ${eventId}`);
					const responseData = await response.json();
					console.log('Sign up response:', responseData);

					// Update the database or other needed actions to save the sign-up info
					// Placeholder code to update the database and perform other actions
					// Example: Update the user's profile or event attendance status
					const userData = await fetch(`${process.env.BACKEND_URL}/api/user/profile`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							eventId,
							status: 'attending' // User's status updated to: 'attending' for the event
						})
					});
					if (!userData.ok) {
						throw new Error('Failed to update user profile');
					}
					console.log('User profile updated successfully');

					// Update the store to reflect the user's sign-up status for the event
					setStore(prevState => {
						// Find the event in the events array and update its sign-up status
						const updatedEvents = prevState.events.map(event => {
							if (event.id === eventId) {
								return { ...event, isSignedUp: true };
							}
							return event;
						});
						return { ...prevState, events: updatedEvents };
					});


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

			fetchEventRecommended: async () => {
				try {
					//correct backend logic as needed to see recommended events
					const response = await fetch(process.env.BACKEND_URL + "/api/events");
					const data = await response.json();
					setStore({ events: data }); // Set the fetched events in the store
					return data;
				} catch (error) {
					console.error("Error fetching events from backend", error);
				}
			},

			fetchAllEvents: async () => {
				try {
					//replace API with ours
					const response = await fetch(`${process.env.BACKEND_URL}/api/events`);
					if (!response.ok) {
						throw new Error('Failed to fetch events');
					}
					const data = await response.json();
					// Update the store with the fetched events
					setStore(prevState => ({
						...prevState,
						events: data
					}));
				} catch (error) {
					console.error('Error fetching events', error);
					// Handle the error as needed
				}
			},
		},
	};
};

export default getState;
