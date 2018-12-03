import React, { Component } from "react";

import Filters from "./Filters.js";

import './style/Header.scss';
import './style/FontColors.scss';

class Header extends Component{

  render(){
    return(
      <section className="Header col-lg-12">
        <h1><b>Live here.</b> Book unique homes and <br />experience a city like a local.</h1>

        <Filters />

      </section>
    )
  }
}

export default Header;