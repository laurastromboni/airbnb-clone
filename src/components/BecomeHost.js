import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style/BecomeHost.scss";

class BecomeHost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      property_type: "",
      room_type: "",
      accomodates: "",
      beds: "",
      bedrooms: "",
      bathrooms: "",
      neighbourhood: "",
      amenities: "",
      title: "",
      description: "",
      country: "",
      city: "",
      price: "",
      picture_url: "",
      isSubmitSuccessful: false
    }
  }

  synchro(event) {
    const { name, value } = event.target;

    this.setState({[name]: value});
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post("http://localhost:5555/api/houses", this.state)
    .then(response => {
      // console.log("Add House", response.data);
      this.setState({
        property_type: "",
        room_type: "",
        accomodates: "",
        beds: "",
        bedrooms: "",
        bathrooms: "",
        neighbourhood: "",
        amenities: "",
        title: "",
        description: "",
        country: "",
        city: "",
        price: "",
        picture_url: "",
        isSubmitSuccessful: true
      })
    })
    .catch(err => {
      console.log("Something went wrong...", err)
    })
  }

  render() {
      return(
        <section className="BecomeHost">
          <div className="cover">
            <div className="ready">
              <h1>Ready to earn ?</h1>
              <Link to="/becomehostform"><button className="become-button">Get started</button></Link>    
            </div>
          </div>
        </section>
      )
  }
  
}

export default BecomeHost;