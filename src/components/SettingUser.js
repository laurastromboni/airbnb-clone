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
    }
  }

  genSync(event) {
    const { name, value } = event.target;

    this.setState({[name]: value});
  }  

  componentDidMount() {
    const { params } = this.props.match;
  
    // console.log(params.userId);

    axios.get(`http://localhost:5555/api/settinguser/${params.userId}`, {withCredentials: true})
    .then(response => {
      // console.log("------------------",response.data);
      this.setState({
        fullName: response.data.fullName,
        email: response.data.email
      })
    })
    .catch(err => {
      console.log("Smthg went wrong", err)
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    const { params } = this.props.match;

    axios.put(`http://localhost:5555/api/settinguser/${params.userId}`, this.state)
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
        <form onSubmit={event => this.handleSubmit(event)}>
          <label>
            Change your name: <input value={this.state.fullName} onChange={event => this.genSync(event)} type="text" name="fullName" />
          </label>

          <label>
            Change your email: <input value={this.state.email} onChange={event => this.genSync(event)} type="email" name="email" />
          </label>

          <label>
            Password: <input value={this.state.password} onChange={event => this.genSync(event)} type="password" name="originalPassword" />
          </label>

          <button>Change your profile parameters</button>

          <Link to="/userhouses"><button>See all of the places that you created</button></Link>
        </form>
      </section>
    )
  }
}

export default SettingUser;