import React, { Component } from "react";
import {Link} from "react-router-dom"
import axios from 'axios'
import StarRatingComponent from 'react-star-rating-component';
import Filters from "./Filters.js";
import './style/Header.scss';
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
        isSubmitSuccessful : false, 
        gps : {
            lat : 48.8534,
            lng : 2.3488
        }
    }
}

genSync(event){
    const {name, value} = event.target
    this.setState({[name] : value})
}

submitHandler(event){
    event.preventDefault();
    let gps = {...this.state.gps};  
    axios.get(`http://localhost:5555/api/search/${this.state.where}`, {withCredentials : true})
    .then(response => {
        console.log("search", response.data[0])
        
        gps.lng = response.data[0].geopoint[0]                       
        gps.lat = response.data[0].geopoint[1]
        
        this.setState({
            gps,
            searchResults: response.data,
            isSubmitSuccessful : true, 
        })
    })
    .catch(err =>{
        console.log("search", err);
        alert("sorry something went wrong Retrieving Data")
    })
    }
    


componentDidMount(){
  const {allResults} = this.state;
  window.scrollTo(0,0)
  axios.get("http://localhost:5555/api/houses")
      .then(response =>{
          this.setState({allResults : response.data})
      })
      .catch(err=>{
          console.log("Listing Info Error", err);
          alert("Sorry something went wrong")
      })
}

  render(){
      const {searchResults, allResults, gps} = this.state
      let results = searchResults.length > 0 ? searchResults : allResults
      console.log("resultats",results)
    return(
      <section className="PlacesList col-lg-12">
          <section className="Header col-lg-12">
              <h1><b>Live here.</b> Book unique homes and <br />experience a city like a local.</h1>
              <Filters allFilters = {this.state} onGenericChange={event=>this.genSync(event)} handleSubmit={event=>this.submitHandler(event)} />
          </section>
        
            <h3>Our recommandations</h3>
        
        <div className="ListSect col-lg-12">
        <ul className="col-lg-8">
        {results.map(oneHouse=>{
            return(
                <li key = {oneHouse.recordid} className="col-lg-4 col-md-6 col-sm-12">
                    <Link to={houseUrl(oneHouse)}>
                    <div className="place-img"><img src = {oneHouse.xl_picture_url} alt='housepic' /></div>
                    <h4>{oneHouse.name}</h4>
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
            
          <div className="GoogleMap col-lg-4" id="GoogleMap">
                <div className="map"><SingleMap geoloc = {results.map(oneHouse =>{return (oneHouse)})} gps = {this.state.gps} /></div>
          </div>
          </div>
      </section>
    )
  }
}

export default PlacesList;