import React, { Component } from "react";
import {Link} from "react-router-dom"
import axios from 'axios'
import StarRatingComponent from 'react-star-rating-component';
import { Carousel } from 'react-responsive-carousel';
import Popup from "reactjs-popup";
import OrderRecap from "./OrderRecap"
import moment from "moment"
import emptyHeart from '../images/heart-empty.svg';
import fullHeart from '../images/heart-full.svg';
import { DateRangePicker } from 'react-dates';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import './style/PlaceDetails.scss';
import './style/FontColors.scss';


let blockedDates = []


class PlaceDetails extends Component {

    constructor(props){
        super(props);
        this.state = {
            fields : "",
            isFavorite : false,
            currentUser : false,
            startDate: null,
            endDate: null,
            focusedInput: null,
            guest : 1,
            isSubmitSuccessful: false,
            arrayOfDates : []
        }
    }

    functionDatesChange = ({ startDate, endDate }) => { 
        this.setState({ startDate, endDate })
    }
    
    functionFocusChange = (focusedInput) => { 
        this.setState({focusedInput})
    }

    componentDidMount(){
        const {params} = this.props.match
        window.scrollTo(0,0)

        axios.get(`http://localhost:5555/api/houses/${params.houseId}`, { withCredentials: true })
            .then(response => {
                  const { currentUser } = this.props  
                  console.log("House Detail", response.data)

                  const allDates  =["2018-12-11", "2018-12-12", "2018-12-13", "2018-12-14", "2018-12-15", "2018-12-16", "2018-12-17", "2018-12-18", "2018-12-19", "2018-12-20", "2018-12-21", "2018-12-22", "2018-12-23", "2018-12-24", "2018-12-25", "2018-12-26", "2018-12-27", "2018-12-28", "2018-12-29", "2018-12-30", "2018-12-31", "2019-01-01", "2019-01-02", "2019-01-03", "2019-01-04", "2019-01-05", "2019-01-06", "2019-01-07", "2019-01-08", "2019-01-09", "2019-01-10", "2019-01-11", "2019-01-12", "2019-01-13", "2019-01-14", "2019-01-15", "2019-01-16", "2019-01-17", "2019-01-18","2019-01-19","2019-01-20","2019-01-21","2019-01-22","2019-01-23","2019-01-24","2019-01-25","2019-01-26","2019-01-27","2019-01-28","2019-01-29","2019-01-30","2019-01-31", "2019-02-01", "2019-02-02", "2019-02-03", "2019-02-04", "2019-02-05", "2019-02-06", "2019-02-07", "2019-02-08", "2019-02-09", "2019-02-10", "2019-02-11", "2019-02-12", "2019-02-13", "2019-02-14", "2019-02-15", "2019-02-16", "2019-02-17", "2019-02-18","2019-02-19","2019-02-20","2019-02-21","2019-02-22","2019-02-23","2019-02-24","2019-02-25","2019-02-26","2019-02-27","2019-02-28","2019-02-29","2019-03-01", "2019-03-02", "2019-03-03", "2019-03-04", "2019-03-05", "2019-03-06", "2019-03-07", "2019-03-08", "2019-03-09", "2019-03-10", "2019-03-11", "2019-03-12", "2019-03-13", "2019-03-14", "2019-03-15", "2019-03-16", "2019-03-17", "2019-03-18","2019-03-19","2019-03-20","2019-03-21","2019-03-22","2019-03-23","2019-03-24","2019-03-25","2019-03-26","2019-03-27","2019-03-28","2019-03-29","2019-03-30","2019-03-31", "2019-04-01", "2019-04-02", "2019-04-03", "2019-04-04", "2019-04-05", "2019-04-06", "2019-04-07", "2019-04-08", "2019-04-09", "2019-04-10", "2019-04-11", "2019-04-12", "2019-04-13", "2019-04-14", "2019-04-15", "2019-04-16", "2019-04-17", "2019-04-18","2019-04-19","2019-04-20","2019-04-21","2019-04-22","2019-04-23","2019-04-24","2019-04-25","2019-04-26","2019-04-27","2019-04-28","2019-04-29","2019-04-30","2019-05-01", "2019-05-02", "2019-05-03", "2019-05-04", "2019-05-05", "2019-05-06", "2019-05-07", "2019-05-08", "2019-05-09", "2019-05-10", "2019-05-11", "2019-05-12", "2019-05-13", "2019-05-14", "2019-05-15", "2019-05-16", "2019-05-17", "2019-05-18","2019-05-19","2019-05-20","2019-05-21","2019-05-22","2019-05-23","2019-05-24","2019-05-25","2019-05-26","2019-05-27","2019-05-28","2019-05-29","2019-05-30","2019-05-31", "2019-06-01", "2019-06-02", "2019-06-03", "2019-06-04", "2019-06-05", "2019-06-06", "2019-06-07", "2019-06-08", "2019-06-09", "2019-06-10", "2019-06-11", "2019-06-12", "2019-06-13", "2019-06-14", "2019-06-15", "2019-06-16", "2019-06-17", "2019-06-18","2019-06-19","2019-06-20","2019-06-21","2019-06-22","2019-06-23","2019-06-24","2019-06-25","2019-06-26","2019-06-27","2019-06-28","2019-06-29","2019-06-30"]
                  this.setState(response.data)

                  blockedDates = []
                  allDates.forEach(oneDate =>{
                      if(this.state.availableDates.indexOf(oneDate)===-1){
                          blockedDates.push(moment(oneDate))
                      }
                  })

                    return axios.get(`http://localhost:5555/api/settinguser/${currentUser._id}`, { withCredentials: true })
                
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

    genSync(event){
      const {name, value} = event.target
      this.setState({[name] : value})
  }


  handleSubmit(event){
    event.preventDefault();
    const {where, guest, price} = this.state 
    const arrayOfDates =[]

    var currentDate = this.state.startDate;
    while (currentDate <= this.state.endDate) {
        arrayOfDates.push( moment(currentDate).format('YYYY-MM-DD') )
        currentDate = moment(currentDate).add(1, 'days');
    }

    axios.post(`http://localhost:5555/api/booking/${this.state._id}`, {arrayOfDates, where, guest, price })
    .then(response => {
        console.log("booking", response.data)
        
        this.setState({
            isSubmitSuccessful : true, 
            arrayOfDates:arrayOfDates,

        })
    })
    .catch(err =>{
        console.log("search", err);
        alert("We can't create the booking")
    })
    }


    render(){

      const { isFavorite } = this.state
      const isDayBlocked = day => blockedDates.filter(d => d.isSame(day, 'day')).length > 0;

      if (this.state.isSubmitSuccessful){
        return <OrderRecap guest={this.state.guest}
        price={this.state.price}
        dates={this.state.arrayOfDates}
        name={this.state.name}
        recipient={this.state.owner}
        onHouseChange={array => this.syncHousesArray(array)}/>
      }
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
            
            <Popup trigger={<button className="pictures-button h6">See pictures</button>} modal>
                <Carousel>  
                    <div>
                        <img src={this.state.xl_picture_url} alt="img" />
                    </div>
                </Carousel>
            </Popup>
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
                <form onSubmit={event=>this.handleSubmit(event)}>
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
                  
                    <DateRangePicker
                      startDateId="blahStart"
                      endDateId="blahEnd"
                      startDate={this.state.startDate}
                      endDate={this.state.endDate}
                      onDatesChange = {dates=>this.functionDatesChange(dates)}
                      focusedInput={this.state.focusedInput}
                      onFocusChange={focused=>this.functionFocusChange(focused)}
                      isDayBlocked = {isDayBlocked}
                      startDatePlaceholderText = "Start"
                      endDatePlaceholderText = "End"
                    />
                  
                  <h4>Guests</h4>
                  <div className="book-div">
                    <div className="guests">
                      <input onChange = {event=> this.genSync(event)} type="number" name="guests" placeholder="1" className="guests" />
                    </div>
                  </div>
                  <button className="booking-button h6">Book</button>
                </form>
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
