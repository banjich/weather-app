import Search from './components/search/Search';
import './App.css';
import CurrentWeather from './components/current-weather/CurrentWeather';
import { WEATHER_API_URL, API_KEY } from './api';
import { useState } from 'react';
import Forecast from './components/forecast/Forecast';

function App() {
  const [currenWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(' ');
    console.log(searchData);

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecastWeather({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };

  console.log(currenWeather);
  console.log(forecastWeather);

  return (
    <div className='app-container'>
      {/* <span className='app-title'>Weather app</span> */}
      <Search onSearchChange={handleOnSearchChange} />
      {currenWeather && <CurrentWeather data={currenWeather} />}
      {forecastWeather && <Forecast data={forecastWeather} />}
    </div>
  );
}

export default App;
