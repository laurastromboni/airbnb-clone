import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import NavBar from "./components/NavBar.js";
import PlaceDetails from "./components/PlaceDetails.js";
import PlacesList from "./components/HousesList.js";
import HomePage from "./components/HomePage.js";
import Footer from "./components/Footer.js";
import NotFound from "./components/NotFound.js";
import SingleMap from "./components/SingleMap.js";

import './App.scss';
import './components/FontColors.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />

        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/houses/:houseId" component={PlaceDetails}/>
          <Route path="/houses" component={PlacesList} />
          <Route path="/maps" component={SingleMap}/>
          
          <Route component = {NotFound} />
        </Switch> 

        <Footer />

      </div>
    );
  }
}

export default App;
