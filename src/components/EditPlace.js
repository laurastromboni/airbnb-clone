import React, { Component } from "react";
import axios from "axios";
import "./style/EditPlace.scss";
import { Redirect } from "react-router-dom";


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
      <section className="edit-place">
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <label>
              Type: <input value={this.state.property_type} onChange={event => this.synchro(event)} type="text" name="property_type" />
            </label>

            <label>
              Room type: <input value={this.state.room_type} onChange={event => this.synchro(event)} type="text" name="room_type" />
            </label>

            <label>
              Maximum guests: <input value={this.state.accomodates} onChange={event => this.synchro(event)} type="number" name="accomodates" />
            </label>

            <label>
              Bed(s): <input value={this.state.beds} onChange={event => this.synchro(event)} type="number" name="beds" />
            </label>

            <label>
              Bedroom(s) <input value={this.state.bedrooms} onChange={event => this.synchro(event)} type="number" name="bedrooms" />
            </label>

            <label>
              Bathroom(s): <input value={this.state.bathrooms} onChange={event => this.synchro(event)} type="number" name="bathrooms" />
            </label>

            <label>
              Neighbourhood <input value={this.state.neighbourhood} onChange={event => this.synchro(event)} type="text" name="neighbourhood" />
            </label>

            <label>
              Amenities: <input value={this.state.amenities} onChange={event => this.synchro(event)} type="text" name="amenities" />
            </label>

            <label>
              Title: <input value={this.state.name} onChange={event => this.synchro(event)} type="text" name="name" />
            </label>

            <label>
              Description: <input value={this.state.description} onChange={event => this.synchro(event)} type="text" name="description" />
            </label>

            <label>
              Country: <input value={this.state.country} onChange={event => this.synchro(event)} type="text" name="country" />
            </label>

            <label>
              City: <input value={this.state.city} onChange={event => this.synchro(event)} type="text" name="city" />
            </label>

            <label>
              Price: <input value={this.state.price} onChange={event => this.synchro(event)} type="number" name="price" />
            </label>

            <label>
              Image: <input value={this.state.picture_url} onChange={event => this.synchro(event)} type="url" name="picture_url" />
            </label>

            <button>Edit your place</button>
          </form>
      </section>
    )
  }
}

export default EditPlace;