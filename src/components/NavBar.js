import React, { Component } from "react";

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
          <img src={logo} className="App-logo" alt="logo" />
          <SearchBar />
        </div>
        <div className="NavBar-rightside-1 col-lg-8 col-md-8 col-sm-8 col-xs-10">
          <ul>
            <li>Devenez Hôte</li>
            <li>Listes</li>
            <li>Voyages</li>
            <li>Messages</li>
            <li>Aide</li>
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