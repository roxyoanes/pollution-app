import React from 'react';
import { pollutionApi } from "./api";

import './App.css';

const App = () => {
  const [location, setLocation] = React.useState({
    lat: "",
    long: ""
  })

const coord = position =>
  setLocation({
    lat: position.coords.latitude,
    long: position.coords.longitude
  });

  const [error, setError] = React.useState(null);
  const [pollution, setPollution] = React.useState(null);

  React.useEffect(() => {
    const getLocation = () => {
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(coord);
      } else{
        setError("Geolocation is not supported by this browser.");
      }
    };
    getLocation();
  }, []);

  React.useEffect(() => {
    if(location.lat && location.long){
      pollutionApi(location).then(data => {
        setPollution(data);
      });
    }
  }, [location]);

  if(error){
  return <p>{error}</p>
  } else if(pollution){
    return (
      <div className="App">
        <p>
          hello
        </p>
        <p>{pollution.results[0].city}</p>
        <p>{pollution.results[0].value} {pollution.results[0].parameter}</p>
      </div>
    );
  } else {
    return <p>Loading</p>;
  }
}

export default App;
