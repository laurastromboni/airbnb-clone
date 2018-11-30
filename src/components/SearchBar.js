import React, { Component } from "react";

import './SearchBar.scss';
import './FontColors.scss';

class SearchBar extends Component{

  render(){
    return(
      <section className="SearchBar" placeholder="Search for..." name="search">
        <input />
      </section>
    )
    
  }

}

export default SearchBar;