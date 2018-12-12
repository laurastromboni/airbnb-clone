import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import './style/SignupPage.scss';

class SignupPage extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      fullName: "",
      email: "",
      originalPassword: "",
      // currentUser: null, = delete to synchronize
      avatar: "",
    }
  }

  componentDidMount(){
    window.scrollTo(0,0)
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

  uploadImage(event) {
    const { files } = event.target;
    console.log("File SELECTED", files[0]);

    // the "FormData" class will format the files for sending to our API
    const uploadData = new FormData();
    // the name "fileSubmission" is the one your backend route defined
    uploadData.append("fileSubmission", files[0]);

    axios.post("http://localhost:5555/api/upload-image", uploadData, {withCredentials: true})
    .then(response => {
      console.log("Upload Image", response.data);
      this.setState({ avatar: response.data.fileUrl })
    })
    .catch(err => {
      console.log("Upload image failed", err)
    });
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
      <section className="SignupPage">
        
        <div className="cover"><Link to="/houses"><button className="h6">Discover our places</button></Link></div>

        <h2>Welcome to AirBnb !</h2>

        <form onSubmit={event => this.handleSubmit(event)}>
          <label>
            <input value={this.state.fullName}
                   onChange={event => this.genericSync(event)}
                   type="text" name="fullName" placeholder="Nizar" className="fullName"/>
          </label>

          <label>
            <input value={this.state.email}
                   onChange={event => this.genericSync(event)}
                   type="email" name="email" placeholder="nizar@jedi.com" className="email"/>
          </label>

          <label>
            <input value={this.state.originalPassword}
                   onChange={event => this.genericSync(event)}
                   type="password" name="originalPassword" placeholder="*******" className="originalPassword"/>
          </label>


          <label>
            <p>Images</p> 
            <input type="file" onChange={event => this.uploadImage(event)} name="avatar" className="avatar" />
          </label>

          {/* <label>
            <input value={this.state.avatar}
                   onChange={event => this.genericSync(event)}
                   type="url" name="avatar" placeholder="Put your avatar url (optional)" className="avatar" />
          </label> */}

          <button className="h6">Sign Up</button>
        </form>
        <Link to="/login"><h5><u>Already registered ? Please log in.</u></h5></Link>
      </section>
    )

  }

}

export default SignupPage;