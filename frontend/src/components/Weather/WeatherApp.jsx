import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./Weather.css"; // Ensure this file contains the updated CSS

const WeatherApp = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [location, setLocation] = useState("");
    const [weather, setWeather] = useState(null);

    // Handle date change
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    // Fetch weather data (Replace with actual API integration)
    const fetchWeather = () => {
        if (!location) return;
        // Example mock data
        setWeather({
            temp: "25°C",
            condition: "Sunny",
            humidity: "60%",
            windSpeed: "10 km/h",
            icon: "https://openweathermap.org/img/wn/01d.png",
        });
    };

    return (
        <div className="weather-container">
            <h1>Weather App</h1>

            {/* Input Field */}
            <input
                type="text"
                placeholder="Enter Location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />

            {/* Search Button */}
            <button onClick={fetchWeather}>Get Weather</button>

            {/* Calendar Box */}
            <div className="calendar-box">
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="MMMM d, yyyy"
                    className="weather-calendar"
                />
            </div>

            {/* Weather Information */}
            {weather && (
                <div className="weather-info">
                    <img
                        src={weather.icon}
                        alt="Weather Icon"
                        className="weather-icon"
                    />
                    <div className="weather-details">
                        <div>🌡 Temperature: {weather.temp}</div>
                        <div>☁ Condition: {weather.condition}</div>
                        <div>💧 Humidity: {weather.humidity}</div>
                        <div>🌬 Wind Speed: {weather.windSpeed}</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WeatherApp;
