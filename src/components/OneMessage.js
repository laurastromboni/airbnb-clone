import { connect, sendMessage }  from '../api';
import React, { Component } from "react";

import axios from "axios";
import "./style/OneMessage.scss"

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
        
      connect(message => {
        this.pushMessage(message);
      });
    })
    .catch(err => {
      console.log("Messages  Error", err);
      alert('pb retrieving messages')
    })
    
  }

  synchro(event) {
    const { name, value } = event.target;

    this.setState({[name]: value});
  }
  
  pushMessage(newMessage) {
    const { allMessages } = this.state;
    const isThere = allMessages.some(msg => msg._id === newMessage._id);

    if (!isThere) {
      allMessages.push(newMessage);
      this.setState({ allMessages });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const {params} = this.props.match
    const { allMessages,recipient,sender,message} = this.state
    // const price  = Math.floor(this.props.price*(this.props.dates.length-1)*1.1)
    // const city  = this.props.city
    // const arrayOfDates  = this.props.dates
    if (this.props.currentUser._id === this.state.recipient._id){
    axios.post(`http://localhost:5555/api/new-message-host/${params.recipientId}`, {allMessages, recipient, sender, message}, { withCredentials: true })
    .then(response => {
      console.log("Add Message Host", response.data);
      this.setState({
        allMessages : response.data.message, 
        message: "",
        isSubmitSuccessful: false
      })
      const lastIndex = response.data.message.length - 1;
      sendMessage(response.data.message[lastIndex]);
    })
    .catch(err => {
      console.log("Something went wrong...", err)
    })
  }
  else {
    axios.post(`http://localhost:5555/api/new-message-guest/${params.recipientId}`, {allMessages, recipient, sender, message}, { withCredentials: true })
    .then(response => {
      console.log("Add Message Guest", response.data);
      this.setState({
        allMessages : response.data.message, 
        message: "",
        isSubmitSuccessful: false
      })
      const lastIndex = response.data.message.length - 1;
      sendMessage(response.data.message[lastIndex]);
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
              <div key={oneMessage._id}>
          <li>
            {oneMessage.guestMessage ? 
            <h5>{(!this.props.currentUser || this.props.currentUser._id === this.state.recipient._id) ? 
              <span>{this.state.sender.fullName}</span> 
                : 
              <span>you</span> } 
              : 
            {oneMessage.guestMessage}</h5> 
            : null 
            }
            {oneMessage.hostMessage ? 
              <h5>{(this.props.currentUser && this.props.currentUser._id === this.state.recipient._id) ? 
                <span>you</span> 
                  : 
                <span>{this.state.recipient.fullName}</span> } 
                : 
                {oneMessage.hostMessage}</h5> 
                : null }
            
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