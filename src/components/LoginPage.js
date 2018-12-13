import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { Alert } from "react-alert";

import axios from "axios";

import './style/LoginPage.scss';


class LoginPage extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      email: "",
      originalPassword: "",
      // currentUser: null, = delete to synchronize
      message: "",
    }
  }

  componentDidMount(){
    window.scrollTo(0,0)
  }

  //back-end integration
  handleSubmit(event){
    event.preventDefault();

    axios.post(process.env.REACT_APP_SERVER_URL + "/api/login", this.state, { withCredentials: true })
      .then(response => {
        console.log("Login Page SUCCESS", response.data)
        const { userDoc } = response.data;
        // this.setState({ currentUser: userDoc }) = remplace by something else to synchronize
        // send "userDoc" to App.js function that changes "currentUser"
        this.props.onUserChange(userDoc)
      })
      .catch(err => {
        console.log("Login page error", err.response.data.message);
        // alert("Sorry! Something went wrong.");
        this.setState({message: err.response.data.message});
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


        <div className="cover"><Link to="/houses"><button className="h6">Discover our places</button></Link></div>

        <h2>Welcome back to AirBnb !</h2>

        {(this.state.message) && <h5>{this.state.message}</h5>}

        <form onSubmit={event => this.handleSubmit(event)}>

          <label>
            <input value={this.props.email} // .props instead of .state to synchronize
                   onChange={event => this.genericSync(event)}
                   type="email" name="email" placeholder="Email" className="email"/>
          </label>

          <label>
            <input value={this.props.originalPassword} // .props instead of .state to synchronize
                   onChange={event => this.genericSync(event)}
                   type="password" name="originalPassword" placeholder="Password" className="originalPassword"/>
          </label>

          <button className="h6">Log In</button>
        </form>
        <Link to="/signup"><h5><u>Not registered yet ? Please sign up.</u></h5></Link>
      </section>
    )

  }

}

export default LoginPage;