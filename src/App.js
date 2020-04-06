import React from 'react';
import { weatherApi } from "./api";

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

  return (
    <div className="App">
      <p>
        hello
      </p>
    </div>
  );
}

export default App;
