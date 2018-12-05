import React, { Component } from "react";
import { Switch, Route, NavLink, Link } from 'react-router-dom'
import Search from "./Search.js";
import SearchBar from "./SearchBar.js";
import Menu from "./Menu.js";

import './style/NavBar.scss';
import './style/FontColors.scss';
import logo from '../images/logo.svg';
import user from '../images/user.svg';
import menu from '../images/menu.svg';

class NavBar extends Component{

  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
    }
  }

  menuIsClicked(){
    const {isOpen} = this.state
    this.setState( {isOpen : !isOpen} );
  }

  render(){
    const {isOpen} = this.state
    return(
      <section className="NavBar">
        <div className="NavBar-leftside col-lg-4 col-md-4 col-sm-4 col-xs-2">
          <NavLink exact to="/"><img src={logo} className="App-logo" alt="logo" /></NavLink>
          <SearchBar />
        </div>
        <div className="NavBar-rightside-1 col-lg-8 col-md-8 col-sm-8 col-xs-10">
          <ul>
            <Link to="/becomehost"><li>Become a Host</li></Link>
            <Link to="/saved"><li>Saved</li></Link>
            <Link to="/trips"><li>Trips</li></Link>
            <Link to="/messages"><li>Messages</li></Link>
            <Link to="/help"><li>Help</li></Link>
            <Link to="/login"><li>Login</li></Link>
            <Link to="/subscription"><li>Subscribe</li></Link>
          </ul>
          <img src={user} className="App-user" alt="logo" />
        </div>
        <div className="NavBar-rightside-2 col-lg-8">
          <Link to="/menu" onClick={() => this.menuIsClicked()}><img src={menu} className="App-menu" alt="logo" /></Link>
        </div>
        <Switch>
          { isOpen ? <Route exact path = "/menu" component = {Menu} /> : null }
          
        </Switch>
      </section>
    )
  }

}

export default NavBar;