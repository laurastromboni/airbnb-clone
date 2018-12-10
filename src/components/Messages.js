import React, { Component } from "react";
import axios from 'axios'
import {Link} from "react-router-dom"

import "./style/Messages.scss"

function recipientUrl(oneMessage){
  return `/message/${oneMessage._id}`;
}

function senderUrl(oneMessage){
  return `/message/${oneMessage.sender._id}`;
}
class Messages extends Component {

  constructor(props){
    super(props);
    this.state = {
        allMessages : [],
        sender : "", 
        recipient: "",
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
        <h2>Messages</h2>
        <ul>
          {allMessages.map(oneMessage=>{
            return(
              <div>
                {oneMessage.sender.fullName === this.props.currentUser.fullName ? 
                <Link to={recipientUrl(oneMessage)}><li><h3>Chat with {oneMessage.recipient.fullName}</h3></li></Link>
                :
                <Link to={recipientUrl(oneMessage)}><li><h3>Chat with {oneMessage.sender.fullName}</h3></li></Link>
              }
            </div>
            )})}
        </ul>
      </section>
    )
  }
}

export default Messages;