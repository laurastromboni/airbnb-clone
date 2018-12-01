import React, { Component } from "react";

import './Filters.scss';
import './FontColors.scss';

class Filters extends Component{

  render(){
    return(
      <section className="Filters">
        <div className="col-lg-3 col-md-3 col-sm-12 filter-div">
          <h4>Where</h4>
          <input type="text" name="where" placeholder="Destination" />
        </div>
        <div className="col-lg-4 col-md-4 col-sm-12 filter-div">
          <h4>When</h4>
          <div>
            <input type="text" name="when-1" placeholder="Check in" /> → <input name="when-1" placeholder="Check in" />
          </div>
        </div>
        <div className="col-lg-5 col-md-5 col-sm-12 search-div">
          <div className="guest">
            <h4>Guest</h4>
            <input type="number" name="guest" placeholder="1" />
          </div>
          <div className="search-btn">
            <button className="search-button">Search</button>
          </div>
        </div>
      </section>
    )
  }

}

export default Filters;