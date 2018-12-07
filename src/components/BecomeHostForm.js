import React, { Component } from "react";
import { Redirect } from "react-router-dom";
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
      title: "",
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
  });
  }

  render() {
    
    if (this.state.isSubmitSuccessful) {
      return <Redirect to="/houses" />
    }
    return(
      <section className="BecomeHostForm">

        <h2>Become a Host</h2>

        <form onSubmit={event => this.handleSubmit(event)}>
          <label>
            Title <input value={this.state.title} onChange={event => this.synchro(event)} type="text" name="title" />
          </label>

          <div className="type-price">

            <label>
              Type <input value={this.state.property_type} onChange={event => this.synchro(event)} type="text" name="property_type" />
            </label>

            <label>
              Price <input value={this.state.price} onChange={event => this.synchro(event)} type="number" name="price" />
            </label>

          </div>

          <label>
            Description <input value={this.state.description} onChange={event => this.synchro(event)} type="text" name="description" />
          </label>
          
          <label>
            Maximum guests <input value={this.state.accomodates} onChange={event => this.synchro(event)} type="number" name="accomodates" />
          </label>

          <label>
            Amenities <input value={this.state.amenities} onChange={event => this.synchro(event)} type="text" name="amenities" />
          </label>

          <label>
            Room type <input value={this.state.room_type} onChange={event => this.synchro(event)} type="text" name="room_type" />
          </label>

          <label>
            Bed(s) <input value={this.state.beds} onChange={event => this.synchro(event)} type="number" name="beds" />
          </label>

          <label>
            Bedroom(s) <input value={this.state.bedrooms} onChange={event => this.synchro(event)} type="number" name="bedrooms" />
          </label>

          <label>
            Bathroom(s) <input value={this.state.bathrooms} onChange={event => this.synchro(event)} type="number" name="bathrooms" />
          </label>

          <label>
            Neighbourhood <input value={this.state.neighbourhood} onChange={event => this.synchro(event)} type="text" name="neighbourhood" />
          </label>

          <label>
            City <input value={this.state.city} onChange={event => this.synchro(event)} type="text" name="city" />
          </label>

          <label>
            Country <input value={this.state.country} onChange={event => this.synchro(event)} type="text" name="country" />
          </label>

          <label>
            Image <input value={this.state.picture_url} onChange={event => this.synchro(event)} type="url" name="picture_url" />
          </label>

          <button>Add your Home</button>

        </form>

      </section>
    )
  }
}

export default BecomeHostForm;