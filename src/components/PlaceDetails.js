import React, { Component } from "react";
import {Link} from "react-router-dom"
import axios from 'axios'
import data from '../data.json'
import './PlaceDetails.scss';
import './FontColors.scss';

function findHouse(idFromUrl){
  return data.records.find(oneHouse => {
      return oneHouse.recordid === idFromUrl;
  })
}

class PlaceDetails extends Component{

  constructor(props){
    super(props)
    this.state = {
        allResults : [],
        houseItem : [],
    }
}

  
  render(){
    const {params} = this.props.match
    // const {houseItem} = this.state
    const oneHouse = findHouse(params.houseId)
    console.log("oneHouse", oneHouse)
    // console.log("houseItem", houseItem)
    return(
        <section className = "HouseDetails">
        <h2>House Details</h2>
        <img src = {oneHouse.fields.medium_url} alt='housepic' />
        <h3>{oneHouse.fields.name}</h3>
        <h4>Price per night :  {oneHouse.fields.price}$</h4>
        <p>number of reviews : {oneHouse.fields.number_of_reviews}</p>
        
        <Link to="/houselisting">Back to all projects</Link>
        </section>
    )
  }
}

export default PlaceDetails;

