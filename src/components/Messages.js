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
    axios.get(process.env.REACT_APP_SERVER_URL + "/api/all-messages", { withCredentials: true })
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
          <ul>
          {allMessages.map(oneMessage=>{
            return(
              <div className="col-lg-12 one-chat">
                {oneMessage.sender.fullName === this.props.currentUser && this.props.currentUser.fullName ? 
                <Link to={recipientUrl(oneMessage)}><li>
                  <div className="profile-pic col-lg-1 col-md-2">
                    {oneMessage.recipient.avatar?
                      <img src={oneMessage.recipient.avatar} alt="recipient-img" />
                      :
                      <img src={user} alt="recipient-img" />
                    }
                  </div>
                  <div className="book col-lg-3 col-md-4"><h3>{oneMessage.recipient.fullName}</h3> <h6>{oneMessage.arrayOfDates[0]} > {oneMessage.arrayOfDates[oneMessage.arrayOfDates.length-1]}</h6></div>
                  <div className="msg col-lg-7 col-md-4"><h5>{oneMessage.message[oneMessage.message.length-1].guestMessage}{oneMessage.message[oneMessage.message.length-1].hostMessage}</h5> <h5><b>{oneMessage.city}</b></h5></div>
                  <div className="price col-lg-1 col-md-2"><p>{oneMessage.price}$</p></div>
                </li></Link>
                :
                <Link to={recipientUrl(oneMessage)}><li>
                  <div className="profile-pic col-lg-1 col-md-2">
                    {oneMessage.sender.avatar?
                      <img src={oneMessage.sender.avatar} alt="recipient-img" />
                      :
                      <img src={user} alt="recipient-img" />
                    }
                  </div>
                  <div className="book col-lg-3 col-md-4"><h3>{oneMessage.sender.fullName}</h3> <p>{oneMessage.arrayOfDates[0]} > {oneMessage.arrayOfDates[oneMessage.arrayOfDates.length-1]}</p></div>
                  <div className="msg col-lg-7 col-md-4"><p>{oneMessage.message[oneMessage.message.length-1].guestMessage}{oneMessage.message[oneMessage.message.length-1].hostMessage}</p> <p>{oneMessage.city}</p></div>
                  <div className="price col-lg-1 col-md-2"><p>{oneMessage.price}$</p></div>
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

        <div className="cover"></div>
        
      </section>
    )
  }
}

export default Messages;