import React, { Component } from "react";
import {Link} from "react-router-dom"
import axios from 'axios'

import './PlaceDetails.scss';
import './FontColors.scss';

class PlaceDetails extends Component{

  constructor(props){
    super(props)
    this.state = {
        allResults : [],
        houseItem : [],
    }
}

  componentDidMount(){
    const {allResults, houseItem} = this.state;
    const {params} = this.props.match
    axios.get(`https://public.opendatasoft.com/api/records/1.0/search/?dataset=airbnb-ratings&rows=100&sort=number_of_reviews`)
        .then(response =>{
            response.data.records.map(oneHouse=>{
                return(
                allResults.push(oneHouse)
                )})
            this.setState({allResults})
            this.findHouse(params.houseId)

        })
        .catch(err=>{
            console.log("Listing Info Error", err);
            alert("Sorry something went wrong")
        })
  }

  findHouse(idUrl){
    const {allResults, houseItem} = this.state;
    allResults.forEach((oneHouse)=>{
      if(oneHouse.recordid === idUrl) {
        this.setState({houseItem : oneHouse})
      }
     })
  }
  
  render(){
    const {params} = this.props.match
    const {houseItem} = this.state
    // const houseInfo = this.findHouse(params.houseId)
    // console.log("houseInfo", houseInfo)
    console.log("houseItem", houseItem)
    return(
        <section className = "HouseDetails">
        <h2>House Details</h2>
        {/* <h3>{houseItem.fields.name}</h3> */}

        <Link to="/houselisting">Back to all projects</Link>
        </section>
    )
  }
}

export default PlaceDetails;

