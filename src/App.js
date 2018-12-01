import React, { Component } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom'
import NavBar from "./components/NavBar.js";
import PlaceDetails from "./components/PlaceDetails.js";
import PlacesList from "./components/PlacesList.js";
import Filters from "./components/Filters.js";
import HomePage from "./components/HomePage.js";
import NotFound from "./components/NotFound.js";

import './App.scss';
import './components/FontColors.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Filters />


        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/houselisting" component={PlacesList} />
          <Route path="/houses/:houseId" component={PlaceDetails}/>
          
          <Route component = {NotFound} />
        </Switch> 

      </div>
    );
  }
}

export default App;
