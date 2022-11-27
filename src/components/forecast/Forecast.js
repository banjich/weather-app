import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import '../forecast/Forecast.css';

const WEEK_DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const Forecast = ({ data }) => {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  );

  return (
    <div className='forecast'>
      <label className='title'>Daily</label>
      <Accordion allowZeroExpanded>
        {data.list.splice(0, 7).map((day, i) => (
          <AccordionItem key={i}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className='daily-item'>
                  <img
                    width='70px'
                    alt='weather'
                    className='icon-small'
                    src={`icons/${day.weather[0].icon}.png`}
                  />
                  <label className='day'>{forecastDays[i]}</label>
                  <label className='description'>
                    {day.weather[0].description}
                  </label>
                  <label className='min-max'>
                    Min: {Math.round(day.main.temp_min)}°C/ Max:{' '}
                    {Math.round(day.main.temp_max)}°C
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className='daily-details-item'>
                <div className='left'>
                  <label>Pressure</label>
                  <label>Humidity</label>
                  <label>Clouds</label>
                  <label>Wind speed</label>
                  <label>Sea level</label>
                  <label>Feels like</label>
                </div>
                <div className='right'>
                  <label>{day.main.pressure}hPa</label>
                  <label>{day.main.humidity}%</label>
                  <label>{day.clouds.all}%</label>
                  <label>{day.wind.speed}m/s</label>
                  <label>{day.main.sea_level}m</label>
                  <label>{Math.round(day.main.feels_like)} °C</label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Forecast;
