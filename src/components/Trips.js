import React, { Component } from "react";
import {Link} from "react-router-dom";
import axios from "axios"
import "./style/Trips.scss"

function houseUrl(oneBooking){
  return `/houses/${oneBooking.houseId._id}`;
}

class Trips extends Component {

  constructor(props){
    super(props);
    this.state = {
        bookings: [],
        isUpcoming: true,
        isPast: false,
    }
  }

  componentDidMount(){
    window.scrollTo(0,0)
    axios.get("http://localhost:5555/api/bookings-list", { withCredentials: true })
      .then(response =>{
        console.log("RESPONSE.DATA TRIPS", response.data)
        this.setState({bookings : response.data})
      })
      .catch(err=>{
          console.log("Trips Info Error", err);
          alert("Sorry something went wrong")
      })
  }

  render() {
    var moment = require('moment');
    let todaysDate = new Date();
    let afterToday = this.state.bookings.filter(oneBooking => {
      return moment(oneBooking.arrayOfDates[0]).isAfter(todaysDate);
    })
    let beforeToday = this.state.bookings.filter(oneBooking => {
      return moment(oneBooking.arrayOfDates[0]).isBefore(todaysDate);
    })

    return(
      <section className="Trips">
        <div className="upcoming">
          <h2>Upcoming Trips</h2>

          { afterToday.length !== 0 ?
          <div className="col-lg-12 saved-list">
            <ul>
            {afterToday.map((oneBooking, index)=>{
                return(
                    <li key = {oneBooking.index} className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                      <Link to={houseUrl(oneBooking)}>
                      <div className="place-img"><img src ={oneBooking.houseId.xl_picture_url} alt='housepic' /></div>
                      <h4>{oneBooking.houseId.name}</h4>
                      <p>{oneBooking.guests} guests</p>
                      <h5>{oneBooking.price}$ per night</h5>
                      <h5><b>From {oneBooking.arrayOfDates[0]} to {oneBooking.arrayOfDates[1]}</b></h5>
                      </Link>
                    </li>
                )
            })            
            }
            </ul>
          </div>
          :
          <div className="col-lg-12 more">
            <p>You have no upcoming trips. Start exploring ideas for your next trip.</p>
            <div className="cover"></div>
          </div>
        } 
        
        </div>

        <div className="been">
          <h2>Where you’ve been</h2>

            { beforeToday.length !== 0 ?
              <div className="col-lg-12 saved-list">
            <ul>
            {beforeToday.map((oneBooking, index)=>{
                return(
                    <li key = {oneBooking.index} className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                      <Link to={houseUrl(oneBooking)}>
                      <div className="place-img"><img src ={oneBooking.houseId.xl_picture_url} alt='housepic' /></div>
                      <h4>{oneBooking.houseId.name}</h4>
                      <p>{oneBooking.guests} guests</p>
                      <h5>{oneBooking.price}$ per night</h5>
                      <h5><b>From {oneBooking.arrayOfDates[0]} to {oneBooking.arrayOfDates[1]}</b></h5>
                      </Link>
                    </li>
                )
            })            
            }
            </ul>
          </div>
          :
          <div className="col-lg-12 more">
            <p>You have not been anywhere yet. Check our cool places now !</p>
          <Link to="/houses"><button className="booking-button h6">Find places</button></Link>
          </div>
        }
        </div>
      </section>
    )
  }
}

export default Trips;


