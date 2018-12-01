import React, { Component } from "react";
import { Switch, Route, NavLink } from 'react-router-dom'
import SearchBar from "./SearchBar.js";

import './NavBar.scss';
import './FontColors.scss';
import logo from '../images/logo.svg';
import user from '../images/user.svg';
import menu from '../images/menu.svg';

class NavBar extends Component{

  render(){
    return(
      <section className="NavBar">
        <div className="NavBar-leftside col-lg-4 col-md-4 col-sm-4 col-xs-2">
          <NavLink exact to="/"><img src={logo} className="App-logo" alt="logo" /></NavLink>
          <SearchBar />
        </div>
        <div className="NavBar-rightside-1 col-lg-8 col-md-8 col-sm-8 col-xs-10">
          <ul>
            <li>Become a Host</li>
            <li>Saved</li>
            <li>Trips</li>
            <li>Messages</li>
            <li>Help</li>
          </ul>
          <img src={user} className="App-user" alt="logo" />
        </div>
        <div className="NavBar-rightside-2 col-lg-8">
          <img src={menu} className="App-menu" alt="logo" />
        </div>
      </section>
    )
  }

}

export default NavBar;