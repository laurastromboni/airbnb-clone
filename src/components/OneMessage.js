import React, { Component } from "react";

import axios from "axios";

import "./style/OneMessage.scss"

class OneMessage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      message: "",
      recipient: "",
      sender: "",
      newMessagesArray: [],
      isSubmitSuccessful: false
    }
  }

  componentDidMount(){
    window.scrollTo(0,0)
  }

  synchro(event) {
    const { name, value } = event.target;

    this.setState({[name]: value});
  }

  handleSubmit(event) {
    event.preventDefault();

    // const {_idSend} = this.props.currentUser;
    // const {_idRecipe} = this.props.owner;

    // this.setState({recipient: _idRecipe, sender: _idSend }, ()=> {       
    // console.log("---------------------",this.state);
    // });

    const { userMessagesArray } = this.props;
    console.log("TEST USNEUKBYZKJ", userMessagesArray);

    axios.post("http://localhost:5555/api/message", this.state, { withCredentials: true })
    .then(response => {
      console.log("Add Message", response.data);
      const newMessagesArray = [...this.props.userMessagesArray];
      newMessagesArray.push(response.data.message);
      this.setState({newMessagesArray: userMessagesArray});
      
      console.log("THIS IS THE FINAL ARRAY", newMessagesArray);


      this.setState({
        message: "",
        recipient: "",
        sender: "",
        isSubmitSuccessful: false
      })
    })
    .catch(err => {
      console.log("Something went wrong...", err)
    })


  }

  render() {
    const { newMessagesArray } = this.state;
    console.log("THIS IS THE MESSAGE ARRAY", newMessagesArray);
    

    return(
      <section className="OneMessage">
        
        <ul id="messages"></ul>

        <ul>
          {newMessagesArray.map(oneMessage => {
            return(
              <li>
                <h2>Message:{oneMessage.message}</h2>
              </li>
            )
          })}
        </ul>

        <form onSubmit={event => this.handleSubmit(event)}>
          <input id="m" autoComplete="off" value={this.state.message} onChange={event => this.synchro(event)} name="message" />
          <button>Send</button>
        </form>

      </section>
    )
  }
}

export default OneMessage;