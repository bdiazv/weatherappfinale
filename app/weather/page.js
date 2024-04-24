'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from './Layout';
import SearchBar from './SearchBar';
import WeatherCard from './WeatherCard';
import Link from "next/link"
import { useUserAuth } from '../auth-context';

const IndexPage = () => {
  const { user } = useUserAuth();
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeatherData = async (query) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=4780defea6b0d0b71f0c1a5fb37b2b08`);
      setWeatherData(response.data);
      setError(null);
    } catch (error) {
      setError('City not found. Please try again.');
      setWeatherData(null);
    }
  };

  useEffect(() => {
    // Fetch weather data for Calgary as the default
    if(user){
    fetchWeatherData('Calgary');
    }
  }, []);

  //If user is logged in, displays app, if not, message is display and user is prompted to go back to the beginning
  if (user){

  return (
    <Layout>
      <h1 className="text-3xl font-semibold mb-4">Weather App by Bruno</h1>
      <SearchBar onSubmit={fetchWeatherData} />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {weatherData && <WeatherCard weather={weatherData} />}
      <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600">
      <Link href="/">Home</Link>
        </button>
    </Layout>
  );  
} else {
  return(
   <Layout>
  <h1>HAHA NICE TRY, YOU AINT ALLOWED IN HERE PARTNER</h1>
  <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600">
      <Link href="/">Home</Link>
        </button>
  </Layout>
  )
}
}

export default IndexPage;