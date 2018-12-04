import React, { Component } from "react";
import {Link} from "react-router-dom"
import axios from 'axios'
import StarRatingComponent from 'react-star-rating-component';
import Filters from "./Filters.js";
import './Header.scss';

import Header from "./Header.js"
import SingleMap from "./SingleMap.js"


import './style/PlacesList.scss';
import './style/FontColors.scss';

function houseUrl(oneHouse){
  return `/houses/${oneHouse.recordid}`;
}

class PlacesList extends Component{

  constructor(props){
    super(props)
    this.state = {
        searchResults : [],
        allResults : [],
        where :'',
        when1 :'',
        when2 :'',
        guest :'',
        isSubmitSuccessful : false
    }
}

genSync(event){
    const {name, value} = event.target
    this.setState({[name] : value})
}


submitHandler(event){
    this.setState({searchResults : []})
    if(this.state.isSubmitSuccessful === true){
        this.setState({searchResults : []})
    }
    event.preventDefault();
    const {searchResults} = this.state

    axios.get(`http://localhost:5555/api/search/${this.state.where}`)
    .then(response => {
        console.log("search", response.data)
            response.data.map(oneHouse=>{
                return(
                    searchResults.push(oneHouse)
              )})
              this.setState({searchResults})
              this.setState({isSubmitSuccessful : true})
        })
        .catch(err =>{
            console.log("search", err);
            alert("sorry something went wrong")
        })
    }
    


componentDidMount(){
  const {allResults} = this.state;
  axios.get("http://localhost:5555/api/houses")
      .then(response =>{
          console.log(response.data)
          response.data.map(oneHouse=>{
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
      const {searchResults, allResults} = this.state
      let results = searchResults.length > 0 ? searchResults : allResults
    return(
      <section className="PlacesList col-lg-12">
          <section className="Header col-lg-12">
              <h1><b>Live here.</b> Book unique homes and <br />experience a city like a local.</h1>
              <Filters allFilters = {this.state} onGenericChange={event=>this.genSync(event)} handleSubmit={event=>this.submitHandler(event)} />
          </section>
          <h3>Our recommandations</h3>
          <div className="ListSect col-lg-12">
          <ul className="col-lg-8">
              {results.map(oneHouse =>{
                  return(
                      <li key = {oneHouse.recordid} className="col-lg-4 col-md-6 col-sm-12">
                          <div className="place-img"><img src = {oneHouse.fields.xl_picture_url} alt='housepic' /></div>
                          <h4><Link to={houseUrl(oneHouse)} test = {results}>{oneHouse.fields.name}</Link></h4>
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
          <div className="GoogleMap col-lg-4" id="GoogleMap">
                <div className="map"><SingleMap geoloc = {this.state.allResults.map(oneHouse =>{return (oneHouse)})}/></div>
          </div>
          </div>
      </section>
    )
  }
}

export default PlacesList;