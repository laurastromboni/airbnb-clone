import { connect, sendMessage }  from '../api';
import React, { Component } from "react";
 
import 'react-notifications/lib/notifications.css';
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

    axios.get(process.env.REACT_APP_SERVER_URL + `/api/message/${params.recipientId}`, { withCredentials: true })
    .then(response => {
      console.log("One recipient messages", response.data)
      this.setState({
        allMessages : response.data.message.reverse(),
        recipient : response.data.recipient,
        sender : response.data.sender,
      })
        
      if (this.props.currentUser) {
        connect(this.props.currentUser._id, message => {   
          this.pushMessage(message);
        });
      }
      
    })
    .catch(err => {
      console.log("Messages  Error", err);
      alert('pb retrieving messages')
    })  
  }

  componentDidUpdate(oldProps) {
    if (oldProps.currentUser && this.props.currentUser && this.state.recipient) {
      connect(this.props.currentUser._id, message => {   
        this.pushMessage(message);
      });
    }
  }

  synchro(event) {
    const { name, value } = event.target;

    this.setState({[name]: value});
  }
  
  pushMessage(newMessage) {
    const { allMessages } = this.state;
    const isThere = allMessages.some(msg => msg._id === newMessage._id);
    
    if (!isThere) {
      allMessages.unshift(newMessage);
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
    axios.post(process.env.REACT_APP_SERVER_URL + `/api/new-message-host/${params.recipientId}`, {allMessages, recipient, sender, message}, { withCredentials: true })
    .then(response => {
      console.log("Add Message Host", response.data);
      this.setState({
        allMessages : response.data.message.reverse(), 
        message: "",
        isSubmitSuccessful: false
      })

      sendMessage(response.data.message[0]);
    })
    .catch(err => {
      console.log("Something went wrong...", err)
    })
  }
  else {
    axios.post(process.env.REACT_APP_SERVER_URL + `/api/new-message-guest/${params.recipientId}`, {allMessages, recipient, sender, message}, { withCredentials: true })
    .then(response => {
      console.log("Add Message Guest", response.data);
      this.setState({
        allMessages : response.data.message.reverse(), 
        message: "",
        isSubmitSuccessful: false
      })
      
      sendMessage(response.data.message[0]);
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

      <div className="col-lg-12 messages-div justify-content-lg-center justify-content-md-center">

          <div className="recap col-lg-4 col-md-4">
            <img src={this.state.recipient.avatar} alt="" />
            <h4>{this.state.recipient.fullName}</h4>
            <h5>You can ask any questions you want to your host, he/she will be happy to answer you !</h5>
            <hr />
            <h5><span>{this.state.recipient.email}</span></h5>
          </div>

          <div className="chat col-lg-6 col-md-6">
        
          <form onSubmit={event => this.handleSubmit(event)}>
            <div className="input-div">
              <input id="m" value={this.state.message} onChange={event => this.genSync(event)} />
              <div className="btn-div">
                <button>Send a message</button>
              </div>
            </div>
            <img src={this.props.currentUser && this.props.currentUser.avatar} alt="profile-pic" />
          </form>

          <div className="reminder"><p>REMINDER - LEAVE A REVIEW</p></div>
          <hr />

            <ul id="messages">
            {allMessages.map(oneMessage=>{
              return (
                  <div key={oneMessage._id} className="before-li">
              <li>
                {oneMessage.guestMessage ? 
                <div className="content-1">{(!this.props.currentUser || this.props.currentUser._id === this.state.recipient._id) ? 
                  <div className="content-user-2"><img src={this.state.sender.avatar} alt="profile-pic" /></div>
                    : 
                  <div className="content-user-1"><img src={this.props.currentUser.avatar} alt="profile-pic" /></div> }
                
                    {<div className="content-message">{oneMessage.guestMessage}</div>} 
                </div> 
                : null 
                }
                {oneMessage.hostMessage ? 
                  <div className="content-2">
                  {<div className="content-message">{oneMessage.hostMessage}</div>}
                  
                  {(this.props.currentUser && this.props.currentUser._id === this.state.recipient._id) ? 
                    <div className="content-user-1"><img src={this.props.currentUser.avatar} alt="profile-pic" /></div>
                      : 
                    <div className="content-user-2"><img src={this.state.recipient.avatar} alt="profile-pic" /></div>}
                 
                  </div> 
                    : null }
                </li>
                </div>
                )})
              }
                
          </ul>

        </div>

      </div>

      </section>
    )
  }
}

export default OneMessage;