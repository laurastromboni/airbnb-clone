import React, { Component } from "react";
import axios from "axios";
import "./style/SettingUser.scss";
import { Link } from "react-router-dom";

class SettingUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullName: "",
      email: "",
      originalPassword: "",
      avatar: "",
      image: "",
    }
  }

  genSync(event) {
    const { name, value } = event.target;

    this.setState({[name]: value});
  }  
  
  componentDidMount() {
    const { params } = this.props.match;
  
    window.scrollTo(0,0)
    console.log(params.userId);

    // Get the fields of the user in the database
    axios.get(process.env.REACT_APP_SERVER_URL + `/api/settinguser/${params.userId}`, {withCredentials: true})
    .then(response => {
      // console.log("------------------",response.data);
      this.setState({
        fullName: response.data.fullName,
        email: response.data.email,
        avatar: response.data.avatar,
      })

    })
    .catch(err => {
      console.log("Smthg went wrong", err)
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    const { params } = this.props.match;

    axios.put(process.env.REACT_APP_SERVER_URL + `/api/settinguser/${params.userId}`, this.state, { withCredentials: true })
    .then(response => {
      console.log(response.data)
      // const { userDoc } = response.data;
      // console.log(userDoc)
      this.props.onUserChange(response.data)
      
    })
    .catch(err => {
      console.log("Something went wrong", err)
    })
  }

    uploadImage(event) {
    const { files } = event.target;
    console.log("File SELECTED", files[0]);

    // the "FormData" class will format the files for sending to our API
    const uploadData = new FormData();
    // the name "fileSubmission" is the one your backend route defined
    uploadData.append("fileSubmission", files[0]);

    axios.post(process.env.REACT_APP_SERVER_URL + "/api/upload-image", uploadData, {withCredentials: true})
    .then(response => {
      console.log("Upload Image", response.data);
      this.setState({ avatar: response.data.fileUrl })
    })
    .catch(err => {
      console.log("Upload image failed", err)
    });
  }

  render() {

    var el = document.getElementById('avatar');
    var myFile = document.getElementById("hidden");

    if(myFile){
      myFile.addEventListener("change", () => {
        el.innerHTML = "File uploaded";
      });   
    }

    return(
      <section className="SettingUser">
        <h2>Welcome, {this.state.fullName} !</h2>
        <p>Here you can update your settings & access to the places you've add.</p>
        <div className="cover"></div>
        <img className="profil-pic" src={this.state.avatar} alt='avatarpic' />
        <form onSubmit={event => this.handleSubmit(event)}>
          <label>
            <h4>Change your informations</h4>
            <input value={this.state.fullName} onChange={event => this.genSync(event)} type="text" name="fullName" />
          </label>

          <label>
            <input value={this.state.email} onChange={event => this.genSync(event)} type="email" name="email" />
          </label>

          <label>
            <input value={this.state.originalPassword} onChange={event => this.genSync(event)} type="password" name="originalPassword" placeholder="*********"/>
          </label>

          <label className="avatars">
            <div id="avatar">Change your avatar</div>
            <input type="file" onChange={event => this.uploadImage(event)} name="avatar" id="hidden" />
          </label>

          <div className="buttons">
            {this.props.userHousesArray.length > 0 ? <Link to="/userhouses"><button className="see">My places</button></Link> : <Link to="/becomehostform"><button className="see">Add a place</button></Link>}
            <button className="save">Save your changes</button>
          </div>
        </form>

      </section>
    )
  }
}

export default SettingUser;