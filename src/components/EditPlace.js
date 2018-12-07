import React, { Component } from "react";
import axios from "axios";
import "./style/EditPlace.scss";
import { Redirect, Link } from "react-router-dom";


class EditPlace extends Component {
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
      name: "",
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

  componentDidMount() {
    const { params } = this.props.match;
    window.scrollTo(0,0)
    console.log(params);
    // Get the house fields in the database
    axios.get(`http://localhost:5555/api/houses/${params.id}`, {withCredentials: true})
    .then(response => {
      this.setState({
        property_type: response.data.property_type,
        room_type: response.data.room_type,
        accomodates: response.data.accomodates,
        beds: response.data.beds,
        bedrooms: response.data.bedrooms,
        bathrooms: response.data.bathrooms,
        neighbourhood: response.data.neighbourhood,
        amenities: response.data.amenities,
        name: response.data.name,
        description: response.data.description,
        country: response.data.country,
        city: response.data.city,
        price: response.data.price,
        picture_url: response.data.picture_url
      })
    })
    .catch(err => {console.log("Something went wrong", err)});
  }

  handleSubmit(event) {
    event.preventDefault();
    const { params } = this.props.match;

    axios.put(`http://localhost:5555/api/houses/${params.id}`, this.state, { withCredentials: true })
    .then(response => {
      console.log(response.data);
      this.setState({ isSubmitSuccessful: true })
    })
    .catch(err => {console.log("Something went wrong", err)})
  }

  render() {
    const { isSubmitSuccessful } = this.state;
    if (isSubmitSuccessful) {
      return <Redirect to="/userhouses" />
    }

    return(
      <section className="EditPlace">

      <div className="cover"><Link to="/houses"><button className="h6">Discover our places</button></Link></div>

      <h2>Edit your place</h2>

        <form onSubmit={(event) => this.handleSubmit(event)}>
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

          <button className="add-button h6">Edit your place</button>
          </form>
      </section>
    )
  }
}

export default EditPlace;