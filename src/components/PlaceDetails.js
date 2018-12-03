import React, { Component } from "react";
import {Link} from "react-router-dom"
import axios from 'axios'
import './PlaceDetails.scss';
import './FontColors.scss';
import StarRatingComponent from 'react-star-rating-component';

class PlaceDetails extends Component {

    constructor(props){
        super(props);
        this.state = {
            fields : [],
        }
    }
    componentDidMount(){
        const {params} = this.props.match
        axios.get(`https://public.opendatasoft.com/api/datasets/1.0/airbnb-ratings/records/${params.houseId}`)
            .then(response => {
                console.log("Phone List", response.data)
                this.setState(response.data)
            })
            .catch(err => {
                console.log("Phone Details Error", err);
                alert('sorry, something went wrong')
            })
    }

    render(){
      const {recordid, fields} = this.state
        return(
          <section className = "PlaceDetails">
          <div className="img-div">
            <img src = {fields.xl_picture_url} alt='housepic' />
          </div>
          <div className= "content">
            <div className="content-left col-lg-8">
              <div className="span">{fields.property_type}</div>
              <h3>{fields.name}</h3>
              </div>
              <div className="content-right col-lg-4">
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

export default PlaceDetails
