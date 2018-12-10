import React, { Component } from "react";
import axios from 'axios'
import { Redirect } from "react-router-dom";

import "./style/OrderRecap.scss"

class OrderRecap extends Component {

    constructor(props){
        super(props);
        this.state = {
            isSubmitSuccessful: false,
            message : "",
            recipient : "",
        }
    }

  componentDidMount(){
    window.scrollTo(0,0)
    this.setState({recipient : this.props.recipient})
  }

  handleSubmit(event){
    event.preventDefault();
    const {message, recipient} = this.state
    axios.post(`http://localhost:5555/api/message`, {message, recipient}, { withCredentials: true })
    .then(response => {
        console.log("create message", response.data)
        
        this.setState({
            isSubmitSuccessful : true, 
        })
    })
    .catch(err =>{
        console.log("search", err);
        alert("We can't send the message")
    })
  }

  genSync(event){
    const {value} = event.target
    this.setState({message : value})
}


  render() {
    if (this.state.isSubmitSuccessful) {
        return <Redirect to="/trips" />
      }
    return(
      <section className="OrderRecap">
        <h2>Order Recap</h2>
            <div className="big-content">

              <div className="content-left col-lg-8 col-md-6 col-sm-12">
                <label>
                  <h4>Message</h4>
                  <p>You have now to send a message to your host, ask some questions, recommandations, or just present yourself (10 characters min). </p>
                  <input onChange = {event=> this.genSync(event)} type="text" name="message" placeholder="Something..."/> 
                </label>
                <img src={this.props.xl_picture_url} alt="housepic" />
              </div>

              <div className="content-right col-lg-4 col-md-6 col-sm-12">
              <form onSubmit={event=>this.handleSubmit(event)}>
                  <div className="resume">
                    <h3>{this.props.name}</h3>
                    <p>{this.props.guests} guest(s)</p>
                    <h4>{this.props.dates[0]}<i className="fa fa-arrow-right"></i>{this.props.dates[this.props.dates.length-1]} </h4>
                    <hr />
                    <div className="price"><p>{this.props.price}$ x {this.props.dates.length-1} nights</p><p>{this.props.price*(this.props.dates.length-1)}$</p></div>
                    <div className="price"><p>Fees</p><p>{Math.floor(this.props.price*(this.props.dates.length-1)*0.1)}$</p></div>
                    <hr />
                    <div className="price"><h4>Total Price</h4><h4>{Math.floor(this.props.price*(this.props.dates.length-1)*1.1)}$ </h4></div>
                </div>
                  <button className="booking-button h6">Book</button>
                  </form> 
              </div>

            </div>



      </section>
    )
  }
}

export default OrderRecap;


