import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import "./style/BecomeHostForm.scss";
import axios from "axios";

class BecomeHostForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      owner: "",
      property_type: "",
      room_type: "",
      accomodates: "",
      beds: "",
      bedrooms: "",
      bathrooms: "",
      neighbourhood: "",
      amenities: "",
      name: "",
      description: "",
      country: "",
      city: "",
      price: "",
      picture_url: "",
      isSubmitSuccessful: false
    }
  }

  componentDidMount(){
    window.scrollTo(0,0)
  }

  synchro(event) {
    const { name, value } = event.target;

    this.setState({[name]: value});
  }
  
  handleSubmit(event) {
    event.preventDefault();
    const {_id} = this.props.currentUser;
    this.setState({owner: _id}, ()=> {       
    console.log("---------------------",this.state);
    axios.post("http://localhost:5555/api/houses", this.state, { withCredentials: true })
    .then(response => {
      console.log("Add House", response.data);
      const newArray = [...this.props.userHousesArray];
      newArray.push(response.data);
      this.props.onHouseChange(newArray);
      this.setState({
        owner: "",
        property_type: "",
        room_type: "",
        accomodates: "",
        beds: "",
        bedrooms: "",
        bathrooms: "",
        neighbourhood: "",
        amenities: "",
        name: "",
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
  });
  }

  render() {
    
    if (this.state.isSubmitSuccessful) {
      return <Redirect to="/houses" />
    }
    return(
      <section className="BecomeHostForm">

        <div className="cover"><Link to="/houses"><button className="h6">Discover our places</button></Link></div>

        <h2>Become a Host</h2>

        <form onSubmit={event => this.handleSubmit(event)}>
          <label>
            <p>Name</p> <input value={this.state.name} onChange={event => this.synchro(event)} type="text" name="name" placeholder="Quiet cute place perfect for couples" />
          </label>

          <label>
            <p>Type</p> <input value={this.state.property_type} onChange={event => this.synchro(event)} type="text" name="property_type" placeholder="House, appartment..." className="two-col" />
          </label>

          <label>
            <p>Room type</p> <input value={this.state.room_type} onChange={event => this.synchro(event)} type="text" name="room_type" placeholder="Entire place, private room..." className="two-col" />
          </label>

          <label>
            <p>Description</p> <input value={this.state.description} onChange={event => this.synchro(event)} type="text" name="description" placeholder="Describe your place (100 letters min)" />
          </label>
          
          <label>
            <p>Maximum guests</p> <input value={this.state.accomodates} onChange={event => this.synchro(event)} type="number" name="accomodates" placeholder="3" />
          </label>

          <label>
            <p>Amenities</p> <input value={this.state.amenities} onChange={event => this.synchro(event)} type="text" name="amenities" placeholder="Wifi, Heating, Free parking, Washer..." />
          </label>

          <label>
            <p>Bed(s)</p> <input value={this.state.beds} onChange={event => this.synchro(event)} type="number" name="beds" placeholder="2" />
          </label>

          <label>
            <p>Bedroom(s)</p> <input value={this.state.bedrooms} onChange={event => this.synchro(event)} type="number" name="bedrooms" placeholder="1" />
          </label>

          <label>
            <p>Bathroom(s)</p> <input value={this.state.bathrooms} onChange={event => this.synchro(event)} type="number" name="bathrooms" placeholder="1" />
          </label>

          <label>
            <p>Neighbourhood</p> <input value={this.state.neighbourhood} onChange={event => this.synchro(event)} type="text" name="neighbourhood" placeholder="Le Marais" />
          </label>

          <label>
            <p>City</p> <input value={this.state.city} onChange={event => this.synchro(event)} type="text" name="city" placeholder="Paris" />
          </label>

          <label>
            <p>Country</p> <input value={this.state.country} onChange={event => this.synchro(event)} type="text" name="country" placeholder="France" />
          </label>

          <label>
            <p>Price</p> <input value={this.state.price} onChange={event => this.synchro(event)} type="number" name="price" placeholder="120 €" />
          </label>

          <label>
            <p>Image</p> <input value={this.state.picture_url} onChange={event => this.synchro(event)} type="url" name="picture_url" placeholder="Image URL" />
          </label>

          <button className="add-button h6">Add your Home</button>

        </form>

      </section>
    )
  }
}

export default BecomeHostForm;