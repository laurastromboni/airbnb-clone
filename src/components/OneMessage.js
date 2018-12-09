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
      isSubmitSuccessful: false
    }
  }

  componentDidMount(){
    window.scrollTo(0,0)
  }

  handleSubmit(event) {
    event.preventDefault();
    const {_idSend} = this.props.currentUser;
    const {_idRecipe} = this.props.owner;
    this.setState({recipient: _idRecipe, sender: _idSend }, ()=> {       
    console.log("---------------------",this.state);
    axios.post("http://localhost:5555/api/message", this.state, { withCredentials: true })
    .then(response => {
      console.log("Add Message", response.data);
      const newMessagesArray = [...this.props.userMessagesArray];
      newMessagesArray.push(response.data);
      this.props.onHouseChange(newMessagesArray);
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
  });
  }

  render() {
    return(
      <section className="OneMessage">
        
        <ul id="messages"></ul>

        <form onSubmit={event => this.handleSubmit(event)}>
          <input id="m" autoComplete="off" value={this.state.message} onChange={event => this.synchro(event)} />
          <button>Send</button>
        </form>

      </section>
    )
  }
}

export default OneMessage;