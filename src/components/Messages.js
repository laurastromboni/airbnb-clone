import React, { Component } from "react";
import axios from 'axios'
import {Link} from "react-router-dom"
import user from "../images/user.svg"

import "./style/Messages.scss"

function recipientUrl(oneMessage){
  return `/message/${oneMessage._id}`;
}

// function senderUrl(oneMessage){
//   return `/message/${oneMessage.sender._id}`;
// }

class Messages extends Component {

  constructor(props){
    super(props);
    this.state = {
        allMessages : [],
        sender : "", 
        recipient: "",
        arrayOfDates: "",
        city: "",
        price: "",
    }
}

  componentDidMount(){
    window.scrollTo(0,0)
    axios.get("http://localhost:5555/api/all-messages", { withCredentials: true })
    .then(response => {
      console.log("All messages", response.data)
      this.setState({allMessages : response.data})
    })
      .catch(err => {
        console.log("Messages  Error", err);
        alert('pb retrieving messages')
    }) 
  }

  render() {
    const {allMessages} = this.state
    return(
      <section className="Messages">
        <h2>My messages</h2>
        {allMessages.length !== 0 ?
          <ul className="col-lg-12">
          {allMessages.map(oneMessage=>{
            return(
              <div className="col-lg-12 one-chat">
                {oneMessage.sender.fullName === this.props.currentUser.fullName ? 
                <Link to={recipientUrl(oneMessage)}><li>
                  {oneMessage.recipient.avatar?
                    <img src={oneMessage.recipient.avatar} alt="recipient-img" />
                    :
                    <img src={user} alt="recipient-img" />
                  }
                  <div className="book"><h3>{oneMessage.recipient.fullName}</h3> <p>{oneMessage.arrayOfDates[0]} > {oneMessage.arrayOfDates[oneMessage.arrayOfDates.length-1]}</p></div>
                  <div className="msg"><p>{oneMessage.message[oneMessage.message.length-1].guestMessage}{oneMessage.message[oneMessage.message.length-1].hostMessage}</p> <p>{oneMessage.city}</p></div>
                  <p>{oneMessage.price}$</p>
                </li></Link>
                :
                <Link to={recipientUrl(oneMessage)}><li>
                  {oneMessage.sender.avatar?
                    <img src={oneMessage.sender.avatar} alt="recipient-img" />
                    :
                    <img src={user} alt="recipient-img" />
                  }
                  <div className="book"><h3>{oneMessage.sender.fullName}</h3> <p>{oneMessage.arrayOfDates[0]} > {oneMessage.arrayOfDates[oneMessage.arrayOfDates.length-1]}</p></div>
                  <div className="msg"><p>{oneMessage.message[oneMessage.message.length-1].guestMessage}{oneMessage.message[oneMessage.message.length-1].hostMessage}</p> <p>{oneMessage.city}</p></div>
                  <p>{oneMessage.price}$</p>
                </li></Link>
              }
            </div>
            )})}
        </ul>
        :
        <div className="col-lg-12 more">
          <p>Oh ! You have no message yet.</p>
          <h1><b>0</b></h1>
          <Link to="/houses"><button className="booking-button h6">Find more places</button></Link>
        </div>
        }
        
      </section>
    )
  }
}

export default Messages;