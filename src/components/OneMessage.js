import { connect }  from '../api';
import React, { Component } from "react";

import axios from "axios";
import socketIOClient from "socket.io-client";
import openSocket from 'socket.io-client';
import "./style/OneMessage.scss"
const socket = openSocket('http://localhost:5555');

class OneMessage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      allMessages : [],
      recipient: "",
      sender: "",
      message : "",
      isSubmitSuccessful: false, 

    }
    
    connect(message => {
      console.log(message);
    });
 
  }


  componentDidMount(){
    const {params} = this.props.match
    window.scrollTo(0,0)

    axios.get(`http://localhost:5555/api/message/${params.recipientId}`, { withCredentials: true })
    .then(response => {
      console.log("One recipient messages", response.data)
      this.setState({
        allMessages : response.data.message,
        recipient : response.data.recipient,
        sender : response.data.sender,
      })
    })
      .catch(err => {
        console.log("Messages  Error", err);
        alert('pb retrieving messages')
    }) 
  }

  handleSubmit(event) {
    const {params} = this.props.match
    if (this.props.currentUser._id === this.state.recipient._id){
    axios.post(`http://localhost:5555/api/new-message-host/${params.recipientId}`, this.state, { withCredentials: true })
    .then(response => {
      console.log("Add Message", response.data);
      this.setState({
        allMessages : response.data, 
        message: "",
        isSubmitSuccessful: false
      })
    })
    .catch(err => {
      console.log("Something went wrong...", err)
    })
  }
  else {
    axios.post(`http://localhost:5555/api/new-message-guest/${params.recipientId}`, this.state, { withCredentials: true })
    .then(response => {
      console.log("Add Message", response.data);
      this.setState({
        allMessages : response.data, 
        message: "",
        isSubmitSuccessful: false
      })
    })
    .catch(err => {
      console.log("Something went wrong...", err)
    })
  }
  }
  

  genSync(event){
    const {value} = event.target
    this.setState({message : value})
}

render() {
  
  const {allMessages} = this.state
  return(
    
    <section className="OneMessage">
               
        <ul id="messages">
        {allMessages.map(oneMessage=>{
          return (
              <div>
          <li>
            {oneMessage.guestMessage ? <h5>{this.props.currentUser._id === this.state.recipient._id ? <h5>{this.state.sender.fullName}</h5> : <h5>you</h5> } : {oneMessage.guestMessage}</h5> : null }
            {oneMessage.hostMessage ? <h5>{this.props.currentUser._id === this.state.recipient._id ? <h5>you</h5> : <h5>{this.state.recipient.fullName}</h5> } : {oneMessage.hostMessage}</h5> : null }
            
            </li>
            </div>
            )})
          }
            
      </ul>
       

        <form onSubmit={event => this.handleSubmit(event)}>
          <input id="m" value={this.state.message} onChange={event => this.genSync(event)} />
          <button>Send</button>
        </form>


      </section>
    )
  }
}

export default OneMessage;