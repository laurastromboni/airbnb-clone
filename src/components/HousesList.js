import React, { Component } from "react";
import { Link } from "react-router-dom";
// import axios from 'axios';
import StarRatingComponent from 'react-star-rating-component';
import Filters from "./Filters.js";
import './style/Header.scss';
import SingleMap from "./SingleMap.js";
// import {NotificationContainer, NotificationManager} from 'react-notifications';
 
import './style/PlacesList.scss';
import './style/FontColors.scss';
// import moment from "moment"


function houseUrl(id){
  return `/houses/${id}`;
}

class PlacesList extends Component{

  render(){
      const {searchResults, allResults} = this.props
      let results = searchResults.length > 0 ? searchResults : allResults
    //   console.log("resultats",results)
    return(
      <section className="PlacesList col-lg-12">
          <section className="Header col-lg-12">
              <h1><b>Live here.</b> Book unique homes and <br />experience a city like a local.</h1>
              <Filters  address = {this.props.address}
                        startDate = {this.props.startDate} 
                        endDate = {this.props.endDate} 
                        functionDatesChange = {this.props.funcDatesChange}
                        functionFocusChange = {this.props.funcFocusChange}
                        focusedInput = {this.props.focusedInput} 
                        allFilters = {this.props} 
                        onChange = {this.props.onAdressChange} 
                        onGenericChange={this.props.genSync} 
                        handleSubmit={this.props.submitHandler} 
                />
          </section>
        
            <h3>Our recommandations</h3>
        
        <div className="ListSect col-lg-12">
        <ul className="col-lg-8 col-md-8">
        {results.map(oneHouse=>{
            return(
                <li key = {oneHouse._id} className="col-lg-4 col-md-6 col-sm-12">
                    
                    {this.props.currentUser ? (
                        <Link to={houseUrl(oneHouse._id)}>
                            <div className="place-img">
                                <img src = {oneHouse.xl_picture_url} alt='housepic' />
                            </div>
                            <h4>{oneHouse.name}</h4>
                            <h5>{oneHouse.price}$ per night</h5>
                            <div className="reviews">
                                <StarRatingComponent 
                                name="rate1" 
                                editing={false}
                                starCount={5}
                                value={Math.round(oneHouse.review_scores_rating/20)}
                                />
                                <h6>{oneHouse.number_of_reviews}</h6>
                            </div>
                        </Link>
                    ) : (
                        <Link to="/login">
                            <div className="place-img"><img src = {oneHouse.xl_picture_url} alt='housepic' /></div>
                            <h4>{oneHouse.name}</h4>
                            <h5>{oneHouse.price}$ per night</h5>
                            <div className="reviews">
                            <StarRatingComponent 
                            name="rate1" 
                            editing={false}
                            starCount={5}
                            value={Math.round(oneHouse.review_scores_rating/20)}
                            />
                            <h6>{oneHouse.number_of_reviews}</h6>
                            </div>
                        </Link>
                    )}
                    
                 </li>
            )
        })}
        </ul>
            
          <div className="GoogleMap col-lg-4 col-md-4" id="GoogleMap">
                <div className="map"><SingleMap geoloc = {results.map(oneHouse =>{return (oneHouse)})} gps = {this.props.gps} /></div>
          </div>
          </div>

      </section>
    )
  }
}

export default PlacesList;