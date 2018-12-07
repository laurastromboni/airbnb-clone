import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import NavBar from "./components/NavBar.js";
import PlaceDetails from "./components/PlaceDetails.js";
import PlacesList from "./components/HousesList.js";
import Footer from "./components/Footer.js";
import NotFound from "./components/NotFound.js";
import SingleMap from "./components/SingleMap.js";
import BecomeHost from "./components/BecomeHost";
import BecomeHostForm from "./components/BecomeHostForm";
import Help from "./components/Help";
import Messages from "./components/Messages";
import Trips from "./components/Trips";
import Saved from "./components/Saved";
import SignupPage from "./components/SignupPage.js";
import LoginPage from "./components/LoginPage.js";
import GoogleSearch from "./components/GoogleSearch.js";
import SettingUser from "./components/SettingUser";
import EditPlace from "./components/EditPlace";
import UserHouses from "./components/UserHouses";
import "./components/style/Menu.scss";


import Menu from "./components/Menu.js";


import axios from 'axios';

import './components/style/App.scss';
import './components/style/FontColors.scss';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
        currentUser: null,
    }
  }

  componentDidMount(){
    // React doesn't know at the start if we are logged-in or not
    // (but we can ask the server if we are through an API request)
    axios.get("http://localhost:5555/api/checkuser", { withCredentials: true })
        .then( response => {
            console.log("Check User SUCCESS", response.data);
            const { userDoc } = response.data;
            this.syncCurrentUser(userDoc)
        })
        .catch(err => {
            console.log("Check User ERROR", err);
            alert("Sorry! Something went wrong");
        })
  }

    // (must be defined in App.js since it's the owner of "currentUser" now)
  syncCurrentUser(userDoc){
    this.setState({ currentUser : userDoc })
  }

  logoutClick(){
    axios.delete("http://localhost:5555/api/logout", { withCredentials: true })
        .then( () => {
            // make "currentUser" empty again (like it was at the start)
            this.syncCurrentUser(null)
        })
        .catch(err => {
            console.log("Logout ERROR", err)
            alert("Sorry! Something went wrong.")
        })
  }

  render() {
    return (
      <div className="App">
        <NavBar currentUser = {this.state.currentUser} logClick={()=>this.logoutClick()}/>

        <Switch>
          <Route exact path="/" component={PlacesList} />
          <Route path="/houses/:houseId" render={({match}) => {
              return <PlaceDetails currentUser={this.state.currentUser} match={match}/>
          }} />
          <Route path="/houses" component={PlacesList} />
          <Route path="/maps" component={SingleMap}/>
          <Route path="/becomehost" component={BecomeHost}/>
          <Route path="/becomehostform" render = {() => {
            return <BecomeHostForm currentUser={this.state.currentUser}/>
          }}/>
          <Route path="/help" component={Help}/>
          <Route path="/messages" component={Messages}/>
          <Route path="/trips" component={Trips}/>
          <Route exact path ="/menu" render ={() => {
            return <Menu currentUser={this.state.currentUser} />
          }} />
          <Route path="/saved" component={Saved}/>
          <Route path="/google" component={GoogleSearch}/>

          {/* way 1 to do it */}
          <Route path="/signup" render = {() => {
              return <SignupPage currentUser={this.state.currentUser} onUserChange={userDoc => this.syncCurrentUser(userDoc)} />
          }} />
          {/* way 2 to do it */}
          <Route path="/login" render = {() =>
              <LoginPage currentUser={this.state.currentUser} onUserChange={userDoc => this.syncCurrentUser(userDoc)} />
          } />
          
          <Route path="/settinguser/:userId" component={SettingUser} />
          <Route path="/edithouse/:id" component={EditPlace} />
          <Route path="/userhouses" component={UserHouses} />
          
          <Route component = {NotFound} />
        </Switch> 

        <Footer />

      </div>
    );
  }
}

export default App;
