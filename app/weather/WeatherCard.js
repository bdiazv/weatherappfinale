import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherCard = ({ weather }) => {
  console.log('Weather:', weather); // Add this logging statement

  const [dailyForecast, setDailyForecast] = useState([]);
  const [countryName, setCountryName] = useState('');
  const [isCelsius, setIsCelsius] = useState(true);

  useEffect(() => {
    if (weather && weather.sys) { // Check if weather is defined and has sys property
      const fetchCountryName = async () => {
        try {
          const response = await axios.get(`https://restcountries.com/v3/alpha/${weather.sys.country}`);
          setCountryName(response.data[0].name.common);
        } catch (error) {
          console.error('Error fetching country name:', error);
        }
      };
  
      fetchCountryName();
    }
  }, [weather]);

  useEffect(() => {
    if (weather && weather.name) { // Check if weather is defined and has name property
      const fetchDailyForecast = async () => {
        try {
          const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${weather.name}&cnt=5&units=metric&appid=4780defea6b0d0b71f0c1a5fb37b2b08`);
          setDailyForecast(response.data.list);
        } catch (error) {
          console.error('Error fetching daily forecast:', error);
        }
      };
  
      fetchDailyForecast();
    }
  }, [weather]);

  const toggleUnit = () => {
    setIsCelsius(!isCelsius);
  };

  const celsiusToFahrenheit = (celsius) => {
    return (celsius * 9/5) + 32;
  };

  const displayTemperature = (temperature) => {
    return isCelsius ? `${temperature.toFixed(2)} °C` : `${celsiusToFahrenheit(temperature).toFixed(2)} °F`;
  };

  const calculateTimeDifference = (date) => {
    const currentTime = new Date();
    const forecastTime = new Date(date);
    const timeDifference = forecastTime.getTime() - currentTime.getTime();
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutesDifference = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

    if (hoursDifference === 0) {
      return `${minutesDifference} minutes`;
    } else if (hoursDifference < 24) {
      return `${hoursDifference} hours`;
    } else {
      return `${Math.floor(hoursDifference / 24)} days`;
    }
  };

  return (
    <div className="mt-8 text-center bg-gray-800 p-8 rounded-lg">
      <h2 className="text-2xl font-semibold">{weather && weather.name}, {countryName}</h2>
      <div className="mt-4 flex flex-col items-center">
        {weather && weather.weather && (
          <>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="Weather Icon" className="mt-2" />
            <p className="mt-2 text-white">{weather.weather[0].description}</p>
          </>
        )}
      </div>
      <div className="mt-4">
        {weather && weather.main && (
          <>
            <p className="text-white">Temperature: {displayTemperature(weather.main.temp)}</p>
            <p className="text-white">Humidity: {weather.main.humidity}%</p>
            <p className="text-white">Wind Speed: {weather.wind.speed} m/s</p>
          </>
        )}
      </div>
      <button onClick={toggleUnit} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600">Toggle Unit</button>

      {/* Display hourly forecast */}
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-white">Daily Outlook:</h3>
        <div className="grid grid-cols-5 gap-4">
          {dailyForecast.map((forecast, index) => (
            <div key={index} className="p-4 bg-gray-700 rounded-md text-white">
              <p className="text-sm">In {calculateTimeDifference(forecast.dt_txt)}</p> 
              <p>Temperature: {displayTemperature(forecast.main.temp)}</p>
              <p>{forecast.weather[0].description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;