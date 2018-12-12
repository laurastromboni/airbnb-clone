import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'
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
import OneMessage from "./components/OneMessage";
import Trips from "./components/Trips";
import Saved from "./components/Saved";
import SignupPage from "./components/SignupPage.js";
import LoginPage from "./components/LoginPage.js";
import GoogleSearch from "./components/GoogleSearch.js";
import SettingUser from "./components/SettingUser";
import EditPlace from "./components/EditPlace";
import UserHouses from "./components/UserHouses";
import Notification from "./components/Notification";
import OrderRecap from "./components/OrderRecap";
import "./components/style/Menu.scss";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { connect } from "./api.js";

import Menu from "./components/Menu.js";

import axios from 'axios';
import moment from "moment"
import './components/style/App.scss';
import './components/style/FontColors.scss';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
        currentUser: null,
        userHousesArray: [],
        userMessagesArray: [],
        address : 'Paris, France',
        where :"Paris",
        searchResults : [],
        allResults : [],
        guest : 1,
        isSubmitSuccessful : false, 
        startDate: moment().add(25, 'days'),
        endDate: moment().add(30, 'days'),
        focusedInput: null,
        dateArray:[],
        gps : {
          lat : 48.8534,
          lng : 2.3488
        }, 
        redirect: false,


    }
  }

  componentDidMount(){

    let gps = {...this.state.gps};
  axios.get("http://localhost:5555/api/houses", { withCredentials: true })
      .then(response =>{
        gps.lng = response.data[0].geopoint[1]                       
        gps.lat = response.data[0].geopoint[0]
          this.setState({gps, allResults : response.data})
      })
      .catch(err=>{
          console.log("Listing Info Error", err);
          alert("Sorry something went wrong")
      })

    // React doesn't know at the start if we are logged-in or not
    // (but we can ask the server if we are through an API request)
    axios.get("http://localhost:5555/api/checkuser", { withCredentials: true })
        .then( response => {
            console.log("Check User SUCCESS", response.data);
            const { userDoc } = response.data;
            this.syncCurrentUser(userDoc);
        })
        .catch(err => {
            console.log("Check User ERROR", err);
            alert("Sorry! Something went wrong");
        })

    axios.get("http://localhost:5555/api/userhouses", {withCredentials : true})
      .then(response => {
        console.log("HOUSES OWNER", response.data);
        this.syncHousesArray(response.data);
      })
      .catch(err => {
        console.log("FAIL", err)
      })
  }

  syncCurrentUser(userDoc){
    this.setState({ currentUser : userDoc });

    if (userDoc) {
      connect(userDoc._id, (message) => {
        NotificationManager.info("Message from ",message.sender.fullName);
      });
    }
  }

  
  logoutClick(){
    axios.delete("http://localhost:5555/api/logout", { withCredentials: true })
        .then( () => {
            // make "currentUser" empty again (like it was at the start)
            this.props.history.push("/");
            this.syncCurrentUser(null)
        })
        .catch(err => {
            console.log("Logout ERROR", err)
            alert("Sorry! Something went wrong.")
        })
  }

  syncHousesArray(userHousesArray) {
    this.setState({userHousesArray})
  }

  syncMessagesArray(userMessagesArray) {
    this.setState({userMessagesArray})
  }

  handleChange = address => {
    this.setState({
        address,
        where : address.split(',')[0]
    });
    };


    submitHandler(event){
      event.preventDefault();
      let gps = {...this.state.gps}; 
      const {where, guest} = this.state 
      const arrayOfDates =[]
  
      var currentDate = this.state.startDate;
      while (currentDate <= this.state.endDate) {
          arrayOfDates.push( moment(currentDate).format('YYYY-MM-DD') )
          currentDate = moment(currentDate).add(1, 'days');
      }
  
      axios.post(`http://localhost:5555/api/search`, {arrayOfDates, where, guest})
      .then(response => {
          console.log("search", response.data)
          
          gps.lng = response.data[0].geopoint[1]                       
          gps.lat = response.data[0].geopoint[0]
          // console.log("gps", gps)
          
  
          this.setState({
              dateArray : arrayOfDates,
              gps,
              searchResults: response.data,
              isSubmitSuccessful : true, 
              redirect : true,
          })
      })
      .catch(err =>{
          console.log("search", err);
          alert("We can't find houses for this city")
      })
      }

    funcDatesChange = ({ startDate, endDate }) => { 
        this.setState({ startDate, endDate })
    }
    
    funcFocusChange = (focusedInput) => { 
        this.setState({focusedInput})
    }

    genSync(event){
      const {name, value} = event.target
      this.setState({[name] : value})
    }

    submitHandlerSearchBar(event){
      event.preventDefault();
      let gps = {...this.state.gps}; 
      const {where, guest} = this.state 
      const arrayOfDates =[]
  
      var currentDate = this.state.startDate;
      while (currentDate <= this.state.endDate) {
          arrayOfDates.push( moment(currentDate).format('YYYY-MM-DD') )
          currentDate = moment(currentDate).add(1, 'days');
      }
  
      axios.post(`http://localhost:5555/api/search`, {arrayOfDates, where, guest})
      .then(response => {
          console.log("search", response.data)
          
          gps.lng = response.data[0].geopoint[1]                       
          gps.lat = response.data[0].geopoint[0]
          // console.log("gps", gps)
          
          this.props.history.push("/");
          this.setState({
              dateArray : arrayOfDates,
              gps,
              searchResults: response.data,
              isSubmitSuccessful : true,
              redirect : true, 
          })
      })
      .catch(err =>{
          console.log("search", err);
          alert("We can't find houses for this city")
      })
      }

  render() {

    return (
      <div className="App">
        <NavBar 
          onAdressChange = {address => this.handleChange(address)} 
          address = {this.state.address} 
          currentUser = {this.state.currentUser} 
          logClick={()=>this.logoutClick()}
          startDate = {this.state.startDate}
          endDate = {this.state.endDate}
          handleSubmit={event => this.submitHandlerSearchBar(event)} 

          />
        <Switch>
          <Route exact path="/" render={() => {
            return <PlacesList 
              onAdressChange = {address => this.handleChange(address)} 
              address = {this.state.address}  
              currentUser={this.state.currentUser} 
              searchResults={this.state.searchResults} 
              allResults={this.state.allResults} 
              guest={this.state.guest} 
              isSubmitSuccessful={this.state.isSubmitSuccessful} 
              startDate={this.state.startDate} 
              endDate={this.state.endDate} 
              dateArray={this.state.dateArray} 
              gps={this.state.gps} 
              focusedInput={this.state.focusedInput} 
              submitHandler = {event => this.submitHandler(event)}
              funcDatesChange = {({ startDate, endDate }) => this.funcDatesChange({ startDate, endDate })}
              funcFocusChange = {focusedInput => this.funcFocusChange(focusedInput)}
              genSync = {event=>this.genSync(event)}
            />
          }} />
          <Route path="/houses/:houseId" render={({match}) => {
              return <PlaceDetails currentUser={this.state.currentUser} match={match}/>
          }} />
           <Route path="/order-recap" render = {() => {
            return <OrderRecap currentUser={this.state.currentUser} />
          }} />
          <Route path="/houses" render = {() => {
            return <PlacesList 
            onAdressChange = {address => this.handleChange(address)} 
            address = {this.state.address}  
            currentUser={this.state.currentUser} 
            searchResults={this.state.searchResults} 
            allResults={this.state.allResults} 
            guest={this.state.guest} 
            isSubmitSuccessful={this.state.isSubmitSuccessful} 
            startDate={this.state.startDate} 
            endDate={this.state.endDate} 
            dateArray={this.state.dateArray} 
            gps={this.state.gps} 
            focusedInput={this.state.focusedInput} 
            submitHandler = {event => this.submitHandler(event)}
            funcDatesChange = {({ startDate, endDate }) => this.funcDatesChange({ startDate, endDate })}
            funcFocusChange = {focusedInput => this.funcFocusChange(focusedInput)}
            genSync = {event=>this.genSync(event)}
          />
          }}  />
          <Route path="/maps" component={SingleMap}/>
          <Route path="/becomehost" render={() => {
            return <BecomeHost currentUser={this.state.currentUser} />
          }}/>
          <Route path="/becomehostform" render = {() => {
            return <BecomeHostForm currentUser={this.state.currentUser}
              userHousesArray={this.state.userHousesArray}
              onHouseChange={array => this.syncHousesArray(array)}/>
          }}/>
          <Route path="/help" component={Help}/>

          <Route path="/messages" render = {() => {
            return <Messages currentUser={this.state.currentUser} /> }}/>
          <Route path="/message/:recipientId" render={({match}) => {
              return <OneMessage currentUser={this.state.currentUser} match={match}/>
          }} />
          <Route path="/onemessage" render = {props => { 
            return <OneMessage userMessagesArray={this.state.userMessagesArray} match={props.match} currentUser={this.state.currentUser} onUserChange={userDoc => this.syncCurrentUser(userDoc)} />
            }} />

          <Route path="/trips" component={Trips}/>
          <Route path="/notification" component={Notification}/>
          <Route exact path ="/menu" render ={() => {
            return <Menu currentUser={this.state.currentUser} logClick={()=>this.logoutClick()} />
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
          
          <Route path="/settinguser/:userId" render = {props => { 
            return <SettingUser userHousesArray={this.state.userHousesArray} match={props.match} currentUser={this.state.currentUser} onUserChange={userDoc => this.syncCurrentUser(userDoc)} />
            }} />
          <Route path="/edithouse/:id" component={EditPlace} />
          <Route path="/userhouses" render= {() => {
          return <UserHouses userHousesArray={this.state.userHousesArray}
              onHouseChange={array => this.syncHousesArray(array)} />
          } } />
          
          <Route component = {NotFound} />
        </Switch> 

        <Footer />
        <NotificationContainer/>
      </div>
    );
  }
}

export default withRouter(App);
