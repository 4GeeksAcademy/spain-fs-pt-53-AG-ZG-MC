import React, { useState, useEffect } from 'react';

/* weather forecast for a given location using an external API endpoint. 
It displays a loading message while fetching data, 
shows an error message if fetching fails, 
and renders the weather forecast data once fetched successfully. */

const WeatherForecast = ({ location }) => {
    const [weatherForecast, setWeatherForecast] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeatherForecast = async () => {
            try {
                const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=f3005ec375c34e01a4e171411241903&q=barcelona`);
                if (!response.ok) {
                    throw new Error('Failed to fetch weather forecast');
                }
                const data = await response.json();
                setWeatherForecast(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWeatherForecast();
    }, [location]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Weather Forecast</h2>
            {/* Display weather forecast data */}
            {weatherForecast && (
                <div>
                    <p>Temperature: {weatherForecast.temperature}</p>
                    <p>Condition: {weatherForecast.condition}</p>
                    {/* Add more weather data as needed */}
                </div>
            )}
        </div>
    );
};

export default WeatherForecast;
