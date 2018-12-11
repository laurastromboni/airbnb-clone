import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import './style/Menu.scss';
import './style/FontColors.scss';

class Menu extends Component{

  render(){
    return(
      <section className="Menu">
      
          <ul>
            {this.props.currentUser ? (
              <span>
                <NavLink to={`/settinguser/${this.props.currentUser._id}`}><li><h1><b>Profile</b></h1></li></NavLink>
                <NavLink to="/becomehost"><li><h1><b>Become a Host</b></h1></li></NavLink>
                <NavLink to="/help"><li><h1><b>Help</b></h1></li></NavLink>
                <NavLink to="/saved"><li><h1><b>Saved</b></h1></li></NavLink>
                <NavLink to="/trips"><li><h1><b>Trips</b></h1></li></NavLink>
                <NavLink to="/messages"><li><h1><b>Messages</b></h1></li></NavLink>
                <button onClick={() => this.props.logClick()}><li><h1><b>Log Out</b></h1></li></button>
              </span>
            ) : (
              <span>
              <NavLink to="/becomehost"><li><h1><b>Become a Host</b></h1></li></NavLink>
              <NavLink to="/help"><li><h1><b>Help</b></h1></li></NavLink>
              <NavLink to="/login"><li><h1><b>Log In</b></h1></li></NavLink>
              <NavLink to="/signup"><li><h1><b>Sign Up</b></h1></li></NavLink>
              </span>
            )}
          </ul>

      </section>
    )
    
  }

}

export default Menu;