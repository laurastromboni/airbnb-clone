import React, { Component } from "react";
import {Link} from "react-router-dom"
import axios from 'axios'
import './style/PlaceDetails.scss';
import './style/FontColors.scss';
import StarRatingComponent from 'react-star-rating-component';

import emptyHeart from '../images/heart-empty.svg';
import fullHeart from '../images/heart-full.svg';

class PlaceDetails extends Component {

    constructor(props){
        super(props);
        this.state = {
            fields : "",
            isFavorite : false,
            currentUser : false,
        }
    }

    componentDidMount(){
        const {params} = this.props.match
        window.scrollTo(0,0)
        axios.get(`http://localhost:5555/api/houses/${params.houseId}`, { withCredentials: true })
            .then(response => {
<<<<<<< HEAD
                // console.log("House Detail", response.data)
=======
              const { currentUser } = this.props  
              console.log("House Detail", response.data)
>>>>>>> 75770c2bb07fbcbbd76a9f95466e11bce2ef491b
                this.setState(response.data)
                return axios.get(`http://localhost:5555/api/settinguser/${currentUser._id}`)
            })
            .then(response => {
              console.log("response.data.favorites", response.data.favorites)
              console.log("params.houseId", params.houseId)
              const { favorites } = response.data
              const filterArray = favorites.some( el => {
                return el.houses === params.houseId
              })
                this.setState({isFavorite: filterArray})
            })
            .catch(err => {
                console.log("House Details Error", err);
                alert('sorry, something went wrong')
            })
    }

    addToFavorites(){
      const {params} = this.props.match
      console.log("ADD FAV TESTING params.houseId", params.houseId)
        axios.put(`http://localhost:5555/api/favorites/${params.houseId}`, {}, { withCredentials: true })
          .then(response => {
            console.log("User", response.data)
            this.setState({ isFavorite : true })
          })
          .catch(err => {
            console.log("User Error", err);
            alert('sorry, something went wrong')
        })
    }

    deleteToFavorites(){
      const {params} = this.props.match
      axios.put(`http://localhost:5555/api/favorites/${params.houseId}/delete`, {}, { withCredentials: true })
        .then(response => {
          // console.log("User", response.data)
          this.setState({ isFavorite : false })
        })
        .catch(err => {
          console.log("User Error", err);
          alert('sorry, something went wrong')
      })
    }

    render(){

      const { isFavorite } = this.state

        return(
          <section className = "PlaceDetails">
          <div className="img-div">
            <img src = {this.state.xl_picture_url} alt='housepic' />
            
            {isFavorite ? 
              <button  onClick={() => this.deleteToFavorites()}
              className="save-button h6">
                <img src={fullHeart} alt="fav" />
                Saved
              </button>
            :
            <button onClick={() => this.addToFavorites()}
            className="save-button h6">
              <img src={emptyHeart} alt="fav" />
              Save
            </button>
            }
            
            <button className="pictures-button h6">See pictures</button>
          </div>
          <div className= "content">
            <div className="content-left col-lg-8 column-1">
              <div className="col-lg-12 top-content">
                <div className="col-lg-10 col-md-10 col-sm-10 top-content-left">
                  <div className="span">{this.state.property_type}</div>
                    <h3>{this.state.name}</h3>
                    <h5>{this.state.neighbourhood}</h5>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-2 top-content-left">
                  <img src={this.state.host_picture_url} alt="host pic" />
                </div>
              </div>
              <div className="col-lg-12 middle-content-left">
                <p><i className="fa fa-home" ></i><b>{this.state.room_type}</b></p>
                <div className="place-type">
                  <p>{this.state.accommodates} guests</p>
                  <p>{this.state.bedrooms} bedrooms</p>
                  <p>{this.state.beds} beds</p>
                  <p>{this.state.bathrooms} bath</p>
                </div>
                <hr />
                <p><b>The space</b></p>
                <p>{this.state.description}</p>
                {/* <hr /> */}
                {/* <p><b>Amenities</b></p> */}
               
                {/* To add : country, city, amenities (list), aviabilities (calendrier à demander), reviews */}
              </div>
            </div>
            <div className="big-content-right col-lg-4 column-2">
              <div className="content-right">
                <div className="price">
                  <h2>{this.state.price}$</h2>
                  <h5>per night</h5>
                </div>
                <div className="reviews">
                  <StarRatingComponent 
                    name="rate1" 
                    editing={false}
                    starCount={5}
                    value={Math.round(this.state.review_scores_rating/20)}
                  />
                  <h6>{this.state.number_of_reviews}</h6>
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
