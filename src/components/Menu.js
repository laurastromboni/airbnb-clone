import React, { Component } from "react";

import './style/Menu.scss';
import './style/FontColors.scss';

class Menu extends Component{

  render(){
    return(
      <section className="Menu">
        <ul>
            <li><h1><b>My Account</b></h1></li>
            <li><h1><b>Become a Host</b></h1></li>
            <li><h1><b>Saved</b></h1></li>
            <li><h1><b>Trips</b></h1></li>
            <li><h1><b>Messages</b></h1></li>
            <li><h1><b>Help</b></h1></li>
          </ul>
      </section>
    )
    
  }

}

export default Menu;