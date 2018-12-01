import React, { Component } from "react";
import axios from 'axios'

import './PlacesList.scss';
import './FontColors.scss';

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
      <section className="PlacesList">
        <h2>Places List</h2>
          <ul>
              {this.state.allResults.map(oneHouse =>{
                  return(
                      <li key = {oneHouse.recordid}>
                          <h3>{oneHouse.fields.name}</h3>
                          <img src = {oneHouse.fields.medium_url} alt='housepic' />
                          <h4>Price per night :  {oneHouse.fields.price}$</h4>
                          <p>number of reviews : {oneHouse.fields.number_of_reviews}</p>
                      </li>
                  )
              })}
          </ul>
      </section>
    )
  }

}

export default PlacesList;


