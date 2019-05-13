// packages
import React from 'react';

// css
import './App.scss';

// components
import NavBar from "./Components/NavBar";
import MapContainer from "./Components/MapContainer";
import BreweryList from "./Components/BreweryList"

function App() {
  return (
    <div>
    <NavBar />
    <MapContainer />
    <BreweryList />
    </div>
  );
}

export default App;
