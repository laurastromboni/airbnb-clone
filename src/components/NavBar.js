import React, { Component } from "react";
import { withRouter, NavLink, Link } from 'react-router-dom'
import SearchBar from "./SearchBar.js";

import './style/NavBar.scss';
import './style/FontColors.scss';
import logo from '../images/logo.svg';
import menu from '../images/menu.svg';

class NavBar extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
    }
  }

  scrollTo(event) {
    return window.scrollTo(0, 0);
  }

  // revenir à la page où on était quand on clique sur le menu responsive
  menuIsClicked(event){
    const {isOpen} = this.state
    this.setState( {isOpen : !isOpen});
    if (isOpen) {
      this.props.history.goBack();
    }
  }

  render(){
    
    return(
      <section className="NavBar">
        <div className="NavBar-leftside col-lg-5 col-md-5 col-sm-5 col-xs-2">
          <NavLink exact to="/"><img src={logo} className="App-logo" alt="logo" onClick={event => this.scrollTo(event)}/></NavLink>
          <SearchBar 
              onChange={this.props.onAdressChange}
              value={this.props.address}
              shouldFetchSuggestions={this.props.address.length > 2} 
              handleSubmit={this.props.handleSubmit} 
              startDate={this.props.startDate} 
              endDate={this.props.endDate} 
          />
        </div>
        <div className="NavBar-rightside-1 col-lg-7 col-md-7 col-sm-7">
          <ul>
            
            {this.props.currentUser ? (
                <span>
                    <NavLink to="/becomehost"><li>Become a Host</li></NavLink>
                    <NavLink to="/help"><li>Help</li></NavLink>
                    <NavLink to="/saved"><li>Saved</li></NavLink>
                    <NavLink to="/trips"><li>Trips</li></NavLink>
                    <NavLink to="/messages"><li>Messages</li></NavLink>
                    <button onClick={() => this.props.logClick()}><li>Log Out</li></button>
                    <NavLink to={`/settinguser/${this.props.currentUser._id}`} className="profile-pic">
                      <img src={this.props.currentUser.avatar} className="App-user" alt="" />
                    </NavLink>
                </span>
            ) : (
                <span>
                <NavLink to="/login"><li>Become a Host</li></NavLink>
                <NavLink to="/help"><li>Help</li></NavLink>
                <NavLink to="/login"><li>Log In</li></NavLink>
                <NavLink to="/signup"><li>Sign Up</li></NavLink>
                </span>
            )}
          </ul>
          
        </div>
        <div className="NavBar-rightside-2 col-lg-8">
          <Link to="/menu" onClick={() => this.menuIsClicked()}><img src={menu} className="App-menu" alt="logo" /></Link>
        
        </div>
      </section>
    )
  }

}

export default withRouter(NavBar);
