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
    let description = ""
      if(pollution.results[0].value <= 50) {
        description = "good"
      } else if (pollution.results[0].value <= 100) {
        description = "moderate"
      } else if(pollution.results[0].value <= 150) {
        description = "unhealthy for sensitive groups"
      } else if(pollution.results[0].value <= 200) {
        description = "unhealthy"
      } else if(pollution.results[0].value <= 300) {
        description = "very unhealthy"
      } else {
        description = "hazardous"
      }
      let city = ""
        if(pollution.results[0].city.includes("/")){
          const splitCity = pollution.results[0].city.split("/");
          city = splitCity[1];
        } else {
          city = pollution.results[0].city
        }
    return (
      <div className="App">
        <p>{city}</p>
        <p>{pollution.results[0].value} {pollution.results[0].parameter}</p>
        <p>{description}</p>
      </div>
    );
  } else {
    return <p>Loading</p>;
  }
}

export default App;
