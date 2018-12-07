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
      originalPassword:"",
      avatar: "",
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
    axios.get(`http://localhost:5555/api/settinguser/${params.userId}`, {withCredentials: true})
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

    axios.put(`http://localhost:5555/api/settinguser/${params.userId}`, this.state, { withCredentials: true })
    .then(response => {
      // console.log("guguguguggugug", response);
    })
    .catch(err => {
      console.log("Something went wrong", err)
    })

  }

  render() {
    return(
      <section className="SettingUser">
        <h2>Welcome, {this.state.fullName} !</h2>
        <p>Here you can update your settings & access to the places you've add.</p>
        <div className="cover"></div>

        <form onSubmit={event => this.handleSubmit(event)}>
          <label>
            <h4>Change your informations</h4>
            <input value={this.state.fullName} onChange={event => this.genSync(event)} type="text" name="fullName" />
          </label>

          <label>
            <input value={this.state.email} onChange={event => this.genSync(event)} type="email" name="email" />
          </label>

          <label>
            <input value={this.state.password} onChange={event => this.genSync(event)} type="password" name="originalPassword" placeholder="*********"/>
          </label>

          <label className="avatars">
            <h4>Change your avatar</h4>
            <input value={this.state.avatar} onChange={event => this.genSync(event)} type="url" name="avatar" placeholder="avatar url" />
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