import React, { Component } from "react";
import axios from "axios";

import './style/SignupPage.scss';

class SignupPage extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      fullName: "",
      email: "",
      originalPassword: "",
      // currentUser: null, = delete to synchronize
    }
  }

  //back-end integration
  handleSubmit(event){
    event.preventDefault();

    axios.post("http://localhost:5555/api/signup", this.state, { withCredentials: true })
      .then(response => {
        console.log("Signup Page SUCCESS", response.data)
        const { userDoc } = response.data;
        // this.setState({ currentUser: userDoc }) = remplace by something else to synchronize
        // send "userDoc" to App.js function that changes "currentUser"
        this.props.onUserChange(userDoc)
      })
      .catch(err => {
        console.log("Signup Page ERROR", err);
        alert("Sorry! Something went wrong.");
      })

  }

  genericSync(event){
    const { name, value } = event.target;
    this.setState({ [name]: value});
  }

  render(){

    // check currentUser (recieve from App.js)
    if(this.props.currentUser){  // if(this.state.currentUser) becoming props to synchronize
      return(
        <section className="SignupPage">
          <h2>You're signed up!</h2>
          <p>Welcome, {this.props.currentUser.fullName}.</p>
          <p>Your user ID is <b>{this.props.currentUser._id}</b></p>
        </section>
      )
    }

    return(
      <section className="SignupPage">
        <h2>Sign Up</h2>

        <form onSubmit={event => this.handleSubmit(event)}>
          <label>
            Full Name :
            <input value={this.state.fullName}
                   onChange={event => this.genericSync(event)}
                   type="text" name="fullName" placeholder="Rey" />
          </label>

          <label>
            Email :
            <input value={this.state.email}
                   onChange={event => this.genericSync(event)}
                   type="email" name="email" placeholder="rey@jedi.com" />
          </label>

          <label>
            Password :
            <input value={this.state.originalPassword}
                   onChange={event => this.genericSync(event)}
                   type="password" name="originalPassword" placeholder="*******" />
          </label>

          <button>Sign Up</button>
        </form>
      </section>
    )

  }

}

export default SignupPage;