import React, { Component } from "react";
import axios from 'axios'

import "./style/Messages.scss"

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
            <li><h3>Message : {oneMessage.message}</h3></li>
            <li><h3>from : {oneMessage.sender.fullName}</h3></li>
            </div>
            )})}
        </ul>
      </section>
    )
  }
}

export default Messages;