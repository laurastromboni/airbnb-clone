import React, { Component } from "react";
import { Link } from "react-router-dom";

import './style/Menu.scss';
import './style/FontColors.scss';

class Menu extends Component{

  render(){
    return(
      <section className="Menu">
        <ul>
            {this.props.currentUser &&
            <Link to={`/settinguser/${this.props.currentUser._id}`}><li><h1><b>My Account</b></h1></li></Link>}
            <Link to="/becomehost"><li><h1><b>Become a Host</b></h1></li></Link>
            <Link to="/saved"><li><h1><b>Saved</b></h1></li></Link>
            <Link to="/trips"><li><h1><b>Trips</b></h1></li></Link>
            <Link to="/messages"><li><h1><b>Messages</b></h1></li></Link>
            <Link to="/help"><li><h1><b>Help</b></h1></li></Link>
          </ul>
      </section>
    )
    
  }

}

export default Menu;