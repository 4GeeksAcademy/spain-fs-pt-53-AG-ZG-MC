import React, { useState, useEffect } from 'react';


const WeatherForecast = ({ location, eventDate }) => {
    const [weatherForecast, setWeatherForecast] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeatherForecast = async () => {
            try {
                const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=f3005ec375c34e01a4e171411241903&q=barcelona&dt=${eventDate}`);
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

    const eventDateFormat = new Date(eventDate).toISOString().split('T')[0];

    const eventWeather = weatherForecast.forecast.forecastday.find(day => day.date === eventDateFormat);

    return (
        <div>
            <h2>Weather Forecast for {eventDate}</h2>
            {eventWeather ? (
                <ul>
                    <li>
                        <div>Condition: {eventWeather.day.condition.text}</div>
                        <div>Temperature (C): {eventWeather.day.avgtemp_c}</div>
                        <div>Precipitation (mm): {eventWeather.day.totalprecip_mm}</div>
                        <div>Wind Speed (kph): {eventWeather.day.maxwind_kph}</div>
                        <div>Snowfall (cm): {eventWeather.day.totalsnow_cm}</div>
                        <div>Humidity: {eventWeather.day.avghumidity}</div>
                        <div>Feels Like (C): {eventWeather.day.avgtemp_c}</div>
                        <div>Chance of Rain: {eventWeather.day.daily_chance_of_rain}</div>
                        <div>Chance of Snow: {eventWeather.day.daily_chance_of_snow}</div>
                    </li>
                </ul>
            ) : (
                <div>No weather data available for the event date.</div>
            )}
        </div>
    );
};

export default WeatherForecast;
