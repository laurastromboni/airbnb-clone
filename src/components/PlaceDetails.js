import React, { Component } from "react";
import {Link} from "react-router-dom"
import axios from 'axios'
import './style/PlaceDetails.scss';
import './style/FontColors.scss';
import StarRatingComponent from 'react-star-rating-component';

import emptyHeard from '../images/heart-empty.svg';

class PlaceDetails extends Component {

    constructor(props){
        super(props);
        this.state = {
            fields : "",
        }
    }
    componentDidMount(){
        const {params} = this.props.match
        window.scrollTo(0,0)
        axios.get(`http://localhost:5555/api/houses/${params.houseId}`, { withCredentials: true })
            .then(response => {
                console.log("House Detail", response.data)
                this.setState(response.data)
            })
            .catch(err => {
                console.log("House Details Error", err);
                alert('sorry, something went wrong')
            })
    }

    render(){
      const {recordid, fields} = this.state
        return(
          <section className = "PlaceDetails">
          <div className="img-div">
            <img src = {fields.xl_picture_url} alt='housepic' />
            <button className="save-button h6"><img src={emptyHeard} alt="fav" />Save</button>
            <button className="pictures-button h6">See pictures</button>
          </div>
          <div className= "content">
            <div className="content-left col-lg-8 column-1">
              <div className="col-lg-12 top-content">
                <div className="col-lg-10 col-md-10 col-sm-10 top-content-left">
                  <div className="span">{fields.property_type}</div>
                    <h3>{fields.name}</h3>
                    <h5>{fields.neighbourhood}</h5>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-2 top-content-left">
                  <img src={fields.host_picture_url} alt="host picture" />
                </div>
              </div>
              <div className="col-lg-12 middle-content-left">
                <p><i className="fa fa-home" ></i><b>{fields.room_type}</b></p>
                <div className="place-type">
                  <p>{fields.accommodates} guests</p>
                  <p>{fields.bedrooms} bedrooms</p>
                  <p>{fields.beds} beds</p>
                  <p>{fields.bathrooms} bath</p>
                </div>
                <hr />
                <p><b>The space</b></p>
                <p>{fields.description}</p>
                {/* <hr /> */}
                {/* <p><b>Amenities</b></p> */}
               
                {/* To add : country, city, amenities (list), aviabilities (calendrier à demander), reviews */}
              </div>
            </div>
            <div className="big-content-right col-lg-4 column-2">
              <div className="content-right">
                <div className="price">
                  <h2>{fields.price}$</h2>
                  <h5>per night</h5>
                </div>
                <div className="reviews">
                  <StarRatingComponent 
                    name="rate1" 
                    editing={false}
                    starCount={5}
                    value={Math.round(fields.review_scores_rating/20)}
                  />
                  <h6>{fields.number_of_reviews}</h6>
                </div>
                <hr />
                <h4>Dates</h4>
                <div className="book-div">
                  <div className="dates">
                    <input onChange = {event=> this.props.onGenericChange(event)} type="date" name="date-1" placeholder="Start" className="date-1" /> → <input onChange = {event=> this.props.onGenericChange(event)} type="date" name="date-2" placeholder="End" className="date-2" />
                  </div>
                </div>
                <h4>Guests</h4>
                <div className="book-div">
                  <div className="guests">
                    <input onChange = {event=> this.props.onGenericChange(event)} type="number" name="guests" placeholder="1" className="guests" />
                  </div>
                </div>
                <button className="booking-button h6">Book</button>
              </div>
            </div>
          </div>
          <div className="col-lg-12 more">
            <Link to="/houses"><button className="booking-button h6">Back to all places</button></Link>
          </div>
        </section>
        )
    }
}

export default PlaceDetails
