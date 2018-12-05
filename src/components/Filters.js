import React, { Component } from "react";
import './style/Filters.scss';
import './style/FontColors.scss';

class Filters extends Component{

  render(){
    return(
      <section>
        <form onSubmit={event=>this.props.handleSubmit(event)} className="Filters">
        <div className="col-lg-3 col-md-3 col-sm-12 filter-div">
          <h4>Where</h4>
          <input onChange = {event=> this.props.onGenericChange(event)} type="text" name="where" value= {this.props.where} placeholder="Destination" />
        </div>
        <div className="col-lg-4 col-md-4 col-sm-12 filter-div">
          <h4>When</h4>
          <div className="when">
            <input onChange = {event=> this.props.onGenericChange(event)} type="text" name="when-1" placeholder="Check in" className="when-1" /> → <input onChange = {event=> this.props.onGenericChange(event)} type="text" name="when-2" placeholder="Check out" className="when-2" />
          </div>
        </div>
        <div className="col-lg-5 col-md-5 col-sm-12 search-div">
          <div className="guest">
            <h4>Guest</h4>
            <input onChange = {event=> this.props.onGenericChange(event)} type="number" name="guest" value= {this.props.guest} placeholder="1" />
          </div>
          <div className="search-btn">
            <button className="search-button">Search</button>
          </div>
        </div>
        </form>
      </section>
    )
  }

}

export default Filters;