import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import axios from "axios";

import './style/LoginPage.scss';

class LoginPage extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      email: "",
      originalPassword: "",
      // currentUser: null, = delete to synchronize
    }
  }

  //back-end integration
  handleSubmit(event){
    event.preventDefault();

    axios.post("http://localhost:5555/api/login", this.state, { withCredentials: true })
      .then(response => {
        console.log("Login Page SUCCESS", response.data)
        const { userDoc } = response.data;
        // this.setState({ currentUser: userDoc }) = remplace by something else to synchronize
        // send "userDoc" to App.js function that changes "currentUser"
        this.props.onUserChange(userDoc)
      })
      .catch(err => {
        console.log("Login Page ERROR", err);
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
      return <Redirect to ="/houses" />
    }

    return(
      <section className="LoginPage">
        <h2>Log In</h2>

        <form onSubmit={event => this.handleSubmit(event)}>

          <label>
            Email :
            <input value={this.props.email} // .props instead of .state to synchronize
                   onChange={event => this.genericSync(event)}
                   type="email" name="email" placeholder="rey@jedi.com" />
          </label>

          <label>
            Password :
            <input value={this.props.originalPassword} // .props instead of .state to synchronize
                   onChange={event => this.genericSync(event)}
                   type="password" name="originalPassword" placeholder="*******" />
          </label>

          <button>Log In</button>
        </form>
      </section>
    )

  }

}

export default LoginPage;