// packages
import React from "react";
import Container from "react-bootstrap/Container";

// css
import "./App.scss";

// components
import NavBar from "./Components/NavBar";
import MapContainer from "./Components/MapContainer";
import BreweryList from "./Components/BreweryList";

function App() {
  return (
    <Container>
      <NavBar />
      <Container>
        <MapContainer />
        <BreweryList />
      </Container>
    </Container>
  );
}

export default App;
