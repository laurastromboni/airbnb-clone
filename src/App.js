import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import NavBar from "./components/NavBar.js";
import PlaceDetails from "./components/PlaceDetails.js";
import PlacesList from "./components/HousesList.js";
import HomePage from "./components/HomePage.js";
import Footer from "./components/Footer.js";
import NotFound from "./components/NotFound.js";
import SingleMap from "./components/SingleMap.js";
import BecomeHost from "./components/BecomeHost";
import Subscription from "./components/Subscription";
import Login from "./components/Login";
import Help from "./components/Help";
import Messages from "./components/Messages";
import Trips from "./components/Trips";
import Saved from "./components/Saved";

import './components/style/App.scss';
import './components/style/FontColors.scss';

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
          <Route path="/becomehost" component={BecomeHost}/>
          <Route path="/subscription" component={Subscription}/>
          <Route path="/login" component={Login}/>
          <Route path="/help" component={Help}/>
          <Route path="/messages" component={Messages}/>
          <Route path="/trips" component={Trips}/>
          <Route path="/saved" component={Saved}/>
          
          <Route component = {NotFound} />
        </Switch> 

        <Footer />

      </div>
    );
  }
}

export default App;
