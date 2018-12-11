import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import StarRatingComponent from 'react-star-rating-component';
import Filters from "./Filters.js";
import './style/Header.scss';
import SingleMap from "./SingleMap.js";

import './style/PlacesList.scss';
import './style/FontColors.scss';
import moment from "moment"


function houseUrl(oneHouse){
  return `/houses/${oneHouse._id}`;
}


class PlacesList extends Component{

  constructor(props){
    super(props)
    this.state = {
        searchResults : [],
        allResults : [],
        where :'Paris',
        when1 :'',
        when2 :'',
        guest : 1,
        isSubmitSuccessful : false, 
        gps : {
            lat : 48.8534,
            lng : 2.3488
        }, 
        address :'Paris, France', 
        startDate: moment().add(7, 'days'),
        endDate: moment().add(9, 'days'),
        focusedInput: null,
        dateArray:[], 
        currentUser : "",
    }
}

genSync(event){
    const {name, value} = event.target
    this.setState({[name] : value})
}

submitHandler(event){
    event.preventDefault();
    let gps = {...this.state.gps}; 
    const {where, guest} = this.state 
    const arrayOfDates =[]

    var currentDate = this.state.startDate;
    while (currentDate <= this.state.endDate) {
        arrayOfDates.push( moment(currentDate).format('YYYY-MM-DD') )
        currentDate = moment(currentDate).add(1, 'days');
    }

    axios.post(`http://localhost:5555/api/search`, {arrayOfDates, where, guest})
    .then(response => {
        console.log("search", response.data)
        
        gps.lng = response.data[0].geopoint[1]                       
        gps.lat = response.data[0].geopoint[0]
        // console.log("gps", gps)
        

        this.setState({
            dateArray : arrayOfDates,
            gps,
            searchResults: response.data,
            isSubmitSuccessful : true, 
        })
    })
    .catch(err =>{
        console.log("search", err);
        alert("We can't find houses for this city")
    })
    }
    

handleChange = address => {
    this.setState({
        address,
        where : address.split(',')[0]
    });
    };

funcDatesChange = ({ startDate, endDate }) => { 
    this.setState({ startDate, endDate })
}

funcFocusChange = (focusedInput) => { 
    this.setState({focusedInput})
}

componentDidMount(){
//   const {allResults} = this.state;
  let gps = {...this.state.gps};
  window.scrollTo(0,0)
  axios.get("http://localhost:5555/api/houses", { withCredentials: true })
      .then(response =>{
        gps.lng = response.data[0].geopoint[1]                       
        gps.lat = response.data[0].geopoint[0]
          this.setState({
              gps, 
              allResults : response.data,
              currentUser : this.props.currentUser

            })
      })
      .catch(err=>{
          console.log("Listing Info Error", err);
          alert("Sorry something went wrong")
      })
}


  render(){
      const {searchResults, allResults} = this.state
      let results = searchResults.length > 0 ? searchResults : allResults
    //   console.log("resultats",results)
    return(
      <section className="PlacesList col-lg-12">
          <section className="Header col-lg-12">
              <h1><b>Live here.</b> Book unique homes and <br />experience a city like a local.</h1>
              <Filters  address = {this.state.address}
                        startDate = {this.state.startDate} 
                        endDate = {this.state.endDate} 
                        functionDatesChange = {({ startDate, endDate }) => this.funcDatesChange({ startDate, endDate })}
                        functionFocusChange = {focusedInput => this.funcFocusChange(focusedInput)}
                        focusedInput = {this.state.focusedInput} 
                        allFilters = {this.state} 
                        onAdressChange = {address => this.handleChange(address)} 
                        onGenericChange={event=>this.genSync(event)} 
                        handleSubmit={event=>this.submitHandler(event)} 

                />
          </section>
        
            <h3>Our recommandations</h3>
        
        <div className="ListSect col-lg-12">
        <ul className="col-lg-8 col-md-8">
        {results.map(oneHouse=>{
            return(
                <li key = {oneHouse._id} className="col-lg-4 col-md-6 col-sm-12">
                    
                    {this.props.currentUser ? (
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
                    ) : (
                        <Link to="/login">
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
                    )}
                    
                    {/* {this.props.currentUser ?
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
                    : 
                    <Link to="/login">
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
                    } */}
                    
                 </li>
            )
        })}
        </ul>
            
          <div className="GoogleMap col-lg-4 col-md-4" id="GoogleMap">
                <div className="map"><SingleMap geoloc = {results.map(oneHouse =>{return (oneHouse)})} gps = {this.state.gps} /></div>
          </div>
          </div>
      </section>
    )
  }
}

export default PlacesList;