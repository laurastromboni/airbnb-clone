import React, { Component } from "react";
import axios from 'axios'
import { Redirect, Link } from "react-router-dom";

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
        
        // this.setState({
        //     isSubmitSuccessful : true, 
        // })
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
        return <Redirect to="/messages" />
      }
    return(
      <section className="OrderRecap">
        <h3>Order Recap</h3>

            <div className="big-content-right col-lg-12">
              <div className="content-right">
              <form onSubmit={event=>this.handleSubmit(event)}>
                  <div className="name">
                    <h2>{this.props.name}$</h2>
                  </div>
                  <div className="guests">
                    <h2>{this.props.guest} guests</h2>
                  </div>
                  <div className="dates">
                    <h2>{this.props.dates[0]} <i className="fas fa-arrow-right"></i> {this.props.dates[this.props.dates.length-1]} </h2>
                  </div>
                  <hr />
                    <div className="price">
                        <h2>{this.props.price}$ x {this.props.dates.length} nights : {this.props.price*this.props.dates.length}$</h2>
                        <h2>Fees : {this.props.price*0.1}$</h2>
                    </div>
                <hr />
                <div className="total-price">
                        <h2>Total Price : {Math.floor(this.props.price*this.props.dates.length*1.1)}$ </h2>
                </div>
                <div className="message">
                    <label>
                        Message :
                        <input onChange = {event=> this.genSync(event)} type="text" name="message" placeholder="Write a message to the host..."/> 
                    </label>
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


