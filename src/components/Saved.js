import React, { Component } from "react";
import {Link} from "react-router-dom";
import StarRatingComponent from 'react-star-rating-component';
import axios from "axios";

import "./style/Saved.scss"

function houseUrl(oneHouse){
  return `/houses/${oneHouse.recordid}`;
}

class Saved extends Component {

  constructor(props){
    super(props);
    this.state = {
        fields : "",
        isFavorite : false,
        currentUser : false,
        favorites: [],
    }
  }

  componentDidMount(){
    window.scrollTo(0,0)
    axios.get("http://localhost:5555/api/favorites-list", { withCredentials: true })
        .then(response =>{
          console.log("Favorites list", response.data)
          this.setState({favorites : response.data.favorites})

        })
        .catch(err=>{
            console.log("Listing Info Error", err);
            alert("Sorry something went wrong")
        })
  }

  render() {

    return(
      <section className="Saved">
        <h2>Saved</h2>
        <ul className="col-lg-12">
        {this.state.favorites.map(oneHouse=>{
            return(
                <li key = {oneHouse.recordid} className="col-lg-3 col-md-6 col-sm-12">
                    <Link to={houseUrl(oneHouse)}>
                    <div className="place-img"><img src = {oneHouse.xl_picture_url} alt='housepic' /></div>
                    <h4>{oneHouse.recordid}</h4>
                    <h5>{oneHouse.price}$ per night</h5>
                    <div className="reviews">
                    <StarRatingComponent 
                    name="rate1" 
                    editing={false}
                    starCount={5}
                    value={Math.round(oneHouse.review_scores_rating/20)}
                    />
                        <h6>{oneHouse.number_of_reviews}</h6>
                    </div>
                    </Link>
                 </li>
            )
        })}
        </ul>
      </section>
    )
  }
}

export default Saved;