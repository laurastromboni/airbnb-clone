import React, { Component } from "react";
import {Link} from "react-router-dom"
import data from '../data.json'
import './PlaceDetails.scss';
import './FontColors.scss';
import StarRatingComponent from 'react-star-rating-component';

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
        <section className = "PlaceDetails">
          <div className="img-div">
            <img src = {oneHouse.fields.xl_picture_url} alt='housepic' />
          </div>
          <div className= "content">
            <div className="content-left col-lg-8">
              <div className="span">{oneHouse.fields.property_type}</div>
              <h3>{oneHouse.fields.name}</h3>
              </div>
              <div className="content-right col-lg-4">
                <div className="price">
                  <h2>{oneHouse.fields.price}$</h2>
                  <h5>per night</h5>
                </div>
                <div className="reviews">
                  <StarRatingComponent 
                    name="rate1" 
                    editing={false}
                    starCount={5}
                    value={Math.round(oneHouse.fields.review_scores_rating/20)}
                  />
                  <h6>{oneHouse.fields.number_of_reviews}</h6>
                </div>
                <hr />
                <button className="booking-button">Ask for booking</button>
              </div>
          </div>
          <div className="col-lg-12">
            <Link to="/houselisting">Back to all places</Link>
          </div>
        </section>
    )
  }
}

export default PlaceDetails;

