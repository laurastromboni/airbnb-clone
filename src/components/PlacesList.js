import React, { Component } from "react";
import axios from 'axios'
import './PlacesList.scss';
import './FontColors.scss';
import {Link} from "react-router-dom"
import star from '../images/star.svg';

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
  axios.get(`https://public.opendatasoft.com/api/records/1.0/search/?dataset=airbnb-ratings&rows=50&sort=number_of_reviews`)
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
        <h2>Places List</h2>
          <ul className="col-lg-12">
              {this.state.allResults.map(oneHouse =>{
                  return(
                      <li key = {oneHouse.recordid} className="col-lg-3 col-md-4 col-sm-6">
                          <div class="place-img"><img src = {oneHouse.fields.medium_url} alt='housepic' /></div>
                          <h4><Link to={houseUrl(oneHouse)} test = {this.state.allResults}>{oneHouse.fields.name}</Link></h4>
                          <h5>{oneHouse.fields.price}$ per night</h5>
                          <div className="reviews">
                              <img src={star} className="star" alt="review" />
                              <img src={star} className="star" alt="review" />
                              <img src={star} className="star" alt="review" />
                              <img src={star} className="star" alt="review" />
                              <img src={star} className="star" alt="review" /> 
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