import React, { Component } from "react";
import {Link} from "react-router-dom"
import axios from 'axios'

import Header from "./Header.js"

import './PlacesList.scss';
import './FontColors.scss';
import StarRatingComponent from 'react-star-rating-component';

function houseUrl(oneHouse){
  return `/houses/${oneHouse.recordid}`;
}

class PlacesList extends Component{

  constructor(props){
    super(props)
    this.state = {
        searchResults : [],
        allResults : [],
    }
}

componentDidMount(){
  const {allResults} = this.state;
  axios.get(`https://public.opendatasoft.com/api/records/1.0/search/?dataset=airbnb-ratings&rows=100&sort=number_of_reviews`)
      .then(response =>{
          console.log(response.data.records)
          response.data.records.map(oneHouse=>{
              return(
              allResults.push(oneHouse)
              )})
          this.setState({allResults})
      })
      .catch(err=>{
          console.log("Listing Info Error", err);
          alert("Sorry something went wrong")
      })
}
  render(){
    return(
      <section className="PlacesList col-lg-12">
          <Header />
          <h3>Our recommandations</h3>
          <ul className="col-lg-12">
              {this.state.allResults.map(oneHouse =>{
                  return(
                      <li key = {oneHouse.recordid} className="col-lg-3 col-md-4 col-sm-6">
                          <div className="place-img"><img src = {oneHouse.fields.xl_picture_url} alt='housepic' /></div>
                          <h4><Link to={houseUrl(oneHouse)} test = {this.state.allResults}>{oneHouse.fields.name}</Link></h4>
                          <h5>{oneHouse.fields.price}$ per night</h5>
                          <div className="reviews">
                          <StarRatingComponent 
                            name="rate1" 
                            editing={false}
                            starCount={5}
                            value={Math.round(oneHouse.fields.review_scores_rating/20)}
                          />
                              <h6>{oneHouse.fields.number_of_reviews}</h6>
                          </div>
                      </li>
                  )
              })}
          </ul>
      </section>
    )
  }
}

export default PlacesList;