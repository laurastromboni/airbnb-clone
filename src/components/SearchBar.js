import React, { Component } from "react";

import './style/SearchBar.scss';
import './style/FontColors.scss';

class SearchBar extends Component{

  render(){
    return(
      <section className="SearchBar">
        <input type="text" placeholder="Search for..." name="search" className="h6"/>
      </section>
    )
    
  }

}

export default SearchBar;