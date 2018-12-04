import React, {Component} from "react";
import "./style/Subscription.scss";


class Subscription extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullName: "",
      email: "",
      password: "",
    }
  }

  genericSync(event) {
    const {name, value} = event.target;

    this.setState({[name] : value});
  }

  render() {

    return(
      <section className="Subscription">
        <h2>Susbcribe here</h2>

        <form >
          <label>
            Name: <input onChange={event => this.genericSync(event)} value={this.state.fullName} type="text" name="fullName" placeholder="Put your name here..." />
          </label>

          <label>
            Email: <input onChange={event => this.genericSync(event)} value={this.state.email} type="mail" name="email" placeholder="example@airbnb.com" />
          </label>

          <label>
            Password: <input onChange={event => this.genericSync(event)} value={this.state.password} type="password" name="password" place="Type your password here" />
          </label>

          <label>
            Profile picture:
          </label>
        </form>
      </section>
    )
  }
}

export default Subscription;