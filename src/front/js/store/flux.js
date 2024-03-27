const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			users: [],
			user: null,
			events: [],
			recommendedEvents: [],
			session: {
				isLoggedIn: false,
				username: null,
				accessToken: null,
			},
			passwordRecovery: {
				isPasswordRecoverySent: false,
				error: null,
			},
		},
		actions: {
			handleCreateUser: async (firstName, lastName, username, email, password, confirmPassword) => {
				try {
					const userData = {
						first_name: firstName,
						last_name: lastName,
						username,
						email,
						password,
						confirm_password: confirmPassword
					};

					const response = await fetch(process.env.BACKEND_URL + "/api/users", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(userData),
					});

					if (!response.ok) {
						throw new Error("Error creating user");
					}

					const data = await response.json();
					

				} catch (error) {
					console.error("Error creating user", error);
					throw error; 
				}
			},

			fetchAllUsers: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/allusers`);
					if (!response.ok) {
						throw new Error('Failed to fetch users');
					}
					const data = await response.json();
					

					setStore({
						users: data
					});
				} catch (error) {
					console.error('Error fetching events', error);
				}
			},

			fetchUserProfile: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/users`, {
						method: 'GET',
						headers: {
							'Authorization': `Bearer ${localStorage.getItem("access_token")}`, 
						}
					});

					if (!response.ok) {
						throw new Error('Failed to fetch user profile');
					}

					const data = await response.json();

					setStore({
						user: data,
						}
					);

					return data;
				} catch (error) {
					console.error('Error fetching user profile:', error);
					throw error;
				}
			},

			editUserProfile: async (updatedProfileData) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/users`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
						},
						body: JSON.stringify(updatedProfileData)
					});

					if (!response.ok) {
						throw new Error('Failed to edit user profile');
					}

					const data = await response.json();
					

					return data; 
				} catch (error) {
					console.error('Error editing user profile:', error);
					throw error;
				}
			},
			
			syncroniseToken: async () => {
				const token = localStorage.getItem("access_token");

				if (token) {
					await getActions().fetchUserProfile();
					setStore({
						session: {
							isLoggedIn: true,
							accessToken: token,
						}
					})
				}
			},

			login: async (username, password) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/login`, {
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

					localStorage.setItem("access_token", data.token)

					

					setStore({session: {
						isLoggedIn: true,
						username: data.username,
						accessToken: data.token,
					}}); 	
				} catch (error) {
					console.error('Error logging in:', error);
					throw error;
				}
			},

			logout: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/logout`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
						},
					});

					if (!response.ok) {
						throw new Error('Failed to logout');
					}

					localStorage.removeItem('access_token');

					
					setStore({session: {
						isLoggedIn: false,
						username: null,
						accessToken: null,
					}});    				
				} catch (error) {
					console.error('Error logging out:', error);
					throw error;
				}
			},

			initiatePasswordRecovery: async (email) => {
				try {
				  const response = await fetch(`${process.env.BACKEND_URL}/api/forgot-password`, {
					method: 'POST',
					headers: {
					  'Content-Type': 'application/json',
					},
					body: JSON.stringify({ email }),
				  });
			
				  if (!response.ok) {
					throw new Error('Failed to initiate password recovery');
				  }
			
				  return await response.json();
				} catch (error) {
				  console.error('Error initiating password recovery:', error);
				  throw error;
				}
			},

			resetPassword: async (token, newPassword) => {
				try {
				  const response = await fetch(`${process.env.BACKEND_URL}/api/reset-password`, {
					method: 'POST',
					headers: {
					  'Content-Type': 'application/json',
					},
					body: JSON.stringify({ token, new_password: newPassword }),
				  });
			
				  if (!response.ok) {
					throw new Error('Failed to reset password');
				  }
			
				  return await response.json();
				} catch (error) {
				  console.error('Error resetting password:', error);
				  throw error;
				}
			},

			createEvent: async (newEvent) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/events", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
						},
						body: JSON.stringify(newEvent),
					});

					if (!response.ok) {
						throw new Error("Error creating event");
					}

					const data = await response.json();
					

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
				  const response = await fetch(`${process.env.BACKEND_URL}/api/events/${eventId}`, {
					method: "PUT",
					headers: {
					  "Content-Type": "application/json",
					  'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
					},
					body: JSON.stringify(updatedEvent),
				  });
			  
				  if (!response.ok) {
					throw new Error("Error updating event");
				  }
			  
				  const data = await response.json();
				  
			  
				  return data; 
				} catch (error) {
				  console.error("Error updating event", error);
				  throw error;
				}
			},
			  
			getMessage: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/hello");
					const data = await response.json();
					setStore({ message: data }); 
					return data;
				} catch (error) {
					console.error("Error fetching message from backend", error);
				}
			},

			signUpForEvent: async (eventId, userId) => {
				try {
				  
				  const response = await fetch(`${process.env.BACKEND_URL}/api/events/${eventId}/signup`, {
					method: 'POST',
					headers: {
					  'Content-Type': 'application/json',
					  'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
					},
					body: JSON.stringify({ user_id: userId })
				  });
			  
				  if (!response.ok) {
					throw new Error('Failed to sign up for the event');
				  }
			  
				  
			  
				} catch (error) {
				  console.error('Error signing up for the event', error);
				  throw error;
				}
			  },
			
			cancelAssistance: async (eventId) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/users/events/${eventId}/signup`, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
						},
					});
					if (!response.ok) {
						throw new Error('Failed to cancel assistance for the event');
					}
					
				} catch (error) {
					console.error('Error canceling assistance for the event', error);
					throw error;
				}
			},

			fetchEventDetails: async (eventId) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/events/${eventId}`, {
						headers: {
							'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
						}
					});

					if (!response.ok) {
						throw new Error('Failed to fetch event details');
					}

					const data = await response.json();

					if (!data || Object.keys(data).length === 0) {
						throw new Error('Empty or unexpected response data');
					}

					setStore({ eventDetails: data }); 

					return data;
				} catch (error) {
					console.error(`Error fetching event details for event ${eventId}`, error);
				}
			},

			getAttendeesCount: async (eventId) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/events/${eventId}/users`, {
						headers: {
							'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
						}
					});
					if (!response.ok) {
						throw new Error('Failed to fetch event attendees');
					}
					const data = await response.json();
					
					return data;
				} catch (error) {
					console.error("Error fetching attendees count", error);
					throw error; 
				}
			},

			fetchEventRecommended: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/events/recommended");
					if (!response.ok) {
						throw new Error('Failed to fetch recommended events');
					}
					const data = await response.json();
					setStore({ recommendedEvents: data }); 
					return data; 
				} catch (error) {
					console.error("Error fetching events from backend", error);
				}
			},

			fetchAllEvents: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/events`);
					if (!response.ok) {
						throw new Error('Failed to fetch events');
					}
					const data = await response.json();
					

					setStore({
						events: data.events || [],      
						totalEvents: data.total_events || 0,
						totalPages: data.total_pages || 0,
						currentPage: data.current_page || 1,
						nextPage: data.next_page || null,
						prevPage: data.prev_page || null
					});
				} catch (error) {
					console.error('Error fetching events', error);
				}
			},

			deleteUser: async () => {
				const actions = getActions();
				try {
					
					const userProfile = await actions.fetchUserProfile();
					if (!userProfile) {
					throw new Error('User profile not found');
					}
				  
				
					if (userProfile.events !== undefined) {
					for (const event of userProfile.events) {
						await actions.deleteEvent(event.id);
					}
				}
				  
				
				const response = await fetch(`${process.env.BACKEND_URL}/api/users`, {
					method: 'DELETE',
					headers: {
						'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
					}
				});
			  
				if (!response.ok) {
					throw new Error('Failed to delete user');
				}
				
				
				setStore({
					session: {
						isLoggedIn: false,
						username: null,
						accessToken: null
					}
				});
				
				
				localStorage.removeItem("access_token");
			  
				
				} catch (error) {
				console.error('Error deleting user:', error);
				throw error;
				}
			},
			
			deleteEvent: async (eventId) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/events/${eventId}`, {
						method: 'DELETE',
						headers: {
							'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
						}
					});

					if (!response.ok) {
						throw new Error('Failed to delete event');
					}

					

				} catch (error) {
					console.error('Error deleting event:', error);
					throw error;
				}
			},

			getEventsByUser: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/users/events`, {
						headers: {
							'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
						}
					});
					if (!response.ok) {
						throw new Error('Failed to fetch events by user');
					}
					const data = await response.json();
					return data;
				} catch (error) {
					console.error("Error fetching events by user:", error);
					throw error;
				}
			},

			getUsersByEvent: async (eventId) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/events/${eventId}/users`, {
						headers: {
							'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
						}
					});
					if (!response.ok) {
						throw new Error('Failed to fetch users by event');
					}
					const data = await response.json();
					return data;
				} catch (error) {
					console.error("Error fetching users by event:", error);
					throw error;
				}
			},

			addEventToFavorites: async (eventId) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/users/events/${eventId}/favorite`, {
						method: "POST",
						headers: {
							'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
						}
					});
					if (!response.ok) {
						throw new Error('Failed to add event to favorites');
					}
					const data = await response.json();
					return data;
				} catch (error) {
					console.error("Error adding event to favorites:", error);
					throw error;
				}
			},

			removeEventFromFavorites: async (eventId) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/users/events/${eventId}/favorite`, {
						method: "DELETE",
						headers: {
							'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
						}
					});
					if (!response.ok) {
						throw new Error('Failed to remove event from favorites');
					}
					const data = await response.json();
					return data;
				} catch (error) {
					console.error("Error removing event from favorites:", error);
					throw error;
				}
			},

			getUserFavoriteEvents: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/users/favorite_event`, {
						headers: {
							'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
						}
					});
					if (!response.ok) {
						throw new Error('Failed to fetch user favorite events');
					}
					const data = await response.json();
					return data;
				} catch (error) {
					console.error("Error fetching user favorite events:", error);
					throw error;
				}
			},

			filterEvents: async (filters) => {
				try {
					const queryString = new URLSearchParams(filters).toString();
					const response = await fetch(`${process.env.BACKEND_URL}/api/events/filter?${queryString}`);
					const data = await response.json();
					return data;
				} catch (error) {
					console.error("Error filtering events:", error);
					throw new Error("Error filtering events");
				}
			},
		},
	};
};

export default getState;


