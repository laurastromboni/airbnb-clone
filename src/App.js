import React, { Component } from 'react';

import NavBar from "./components/NavBar.js";
import PlaceDetails from "./components/PlaceDetails.js";
import PlacesList from "./components/PlacesList.js";
import Filters from "./components/Filters.js";

import './App.scss';
import './components/FontColors.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <PlaceDetails />
        <PlacesList />
        <Filters />
      </div>
    );
  }
}

export default App;
