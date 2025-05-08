import React, { useState } from "react";
import axios from "axios";
import './index.css';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`;

  const searchLocation = async (event) => {
    if (event.key === 'Enter') {
      setLoading(true); 
      try {
        const response = await axios.get(url);
        setData(response.data);
        console.log(response);
        setError('');
      } catch (error) {
        setError('City not found. Please enter a valid city.');
        setData({});
      } finally {
        setLoading(false); 
        setLocation('');
      }
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input 
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      {loading ? <div className="loader"></div> : null} 
      {error && <p className="error">{error}</p>}
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}  {data.sys ? data.sys.country : null}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        
        <div className="bottom">
          <div className="feels">
            {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°F</p> : null}
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
            <p>Humidity</p>
          </div>
          <div className="wind">
            {data.wind ? <p className="bold">{data.wind.speed.toFixed()} MPH</p> : null}
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;
