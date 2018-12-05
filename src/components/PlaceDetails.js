import React, { Component } from "react";
import {Link} from "react-router-dom"
import axios from 'axios'
import './style/PlaceDetails.scss';
import './style/FontColors.scss';
import StarRatingComponent from 'react-star-rating-component';

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
          </div>
          <div className= "content">
            <div className="content-left col-lg-8">
              <div className="span">{fields.property_type}</div>
              <h3>{fields.name}</h3>
              </div>
              <div className="big-content-right col-lg-4">
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
                <button className="booking-button">Ask for booking</button>
              </div>
              </div>
          </div>
          <div className="col-lg-12">
            <Link to="/houses">Back to all places</Link>
          </div>
        </section>
        )
    }
}

export default PlaceDetails
