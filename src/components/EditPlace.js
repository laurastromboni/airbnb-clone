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
      accommodates: "",
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
      xl_picture_url: "",
      xl_picture_url_2: "",
      xl_picture_url_3: "",
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
    axios.get(process.env.REACT_APP_SERVER_URL + `/api/houses/${params.id}`, {withCredentials: true})
    .then(response => {
      this.setState({
        property_type: response.data.property_type,
        room_type: response.data.room_type,
        accommodates: response.data.accommodates,
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
        xl_picture_url: response.data.xl_picture_url,
        xl_picture_url_2: response.data.xl_picture_url_2,
        xl_picture_url_3: response.data.xl_picture_url_3
      })
    })
    .catch(err => {console.log("Something went wrong", err)});
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
      this.setState({ xl_picture_url: response.data.fileUrl })
    })
    .catch(err => {
      console.log("Upload image failed", err)
    });
  }

  uploadImage2(event) {
    const { files } = event.target;
    console.log("File SELECTED", files[0]);

    // the "FormData" class will format the files for sending to our API
    const uploadData = new FormData();
    // the name "fileSubmission" is the one your backend route defined
    uploadData.append("fileSubmission", files[0]);

    axios.post(process.env.REACT_APP_SERVER_URL + "/api/upload-image", uploadData, {withCredentials: true})
    .then(response => {
      console.log("Upload Image", response.data);
      this.setState({ xl_picture_url_2: response.data.fileUrl })
    })
    .catch(err => {
      console.log("Upload image failed", err)
    });
  }

  uploadImage3(event) {
    const { files } = event.target;
    console.log("File SELECTED", files[0]);

    // the "FormData" class will format the files for sending to our API
    const uploadData = new FormData();
    // the name "fileSubmission" is the one your backend route defined
    uploadData.append("fileSubmission", files[0]);

    axios.post(process.env.REACT_APP_SERVER_URL + "/api/upload-image", uploadData, {withCredentials: true})
    .then(response => {
      console.log("Upload Image", response.data);
      this.setState({ xl_picture_url_3: response.data.fileUrl })
    })
    .catch(err => {
      console.log("Upload image failed", err)
    });
  }
  

  handleSubmit(event) {
    event.preventDefault();
    const { params } = this.props.match;

    axios.put(process.env.REACT_APP_SERVER_URL + `/api/houses/${params.id}`, this.state, { withCredentials: true })
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
            {/* <p>Type</p> <input value={this.state.property_type} onChange={event => this.synchro(event)} type="text" name="property_type" placeholder="House, appartment..." className="two-col" /> */}
          
            <select name="property_type" value={this.state.property_type} onChange={event => this.synchro(event)}>
              <option value="Appartment">Appartment</option>
              <option value="House" >House</option>
              <option value="Secondary Unit">Secondary Unit</option>
              <option value="Unique space">Unique space</option>
              <option value="Bed and breakfast">Bed and breakfast</option>
              <option value="Boutique hotel">Boutique hotel</option>
            </select>
          </label>

          <label>
            <p>Room type</p> 
            {/* <input value={this.state.room_type} onChange={event => this.synchro(event)} type="text" name="room_type" placeholder="Entire place, private room..." className="two-col" /> */}

            <select name="room_type" value={this.state.room_type} onChange={event => this.synchro(event)} placeholder="House, appartment..." className="two-col">
              <option value="Entire place">Entire place</option>
              <option value="Private room" >Private room</option>
              <option value="Shared room">Shared room</option>
            </select>
          </label>
  
          <label>
            <p>Description</p> <input value={this.state.description} onChange={event => this.synchro(event)} type="text" name="description" placeholder="Describe your place (100 letters min)" />
          </label>
          
          <label>
            <p>Maximum accommodates</p> <input value={this.state.accommodates} onChange={event => this.synchro(event)} type="number" name="accommodates" placeholder="3" />
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
            <p>Image</p> 
            <input type="file" onChange={event => this.uploadImage(event)} />
            <input type="file" onChange={event => this.uploadImage2(event)} />
            <input type="file" onChange={event => this.uploadImage3(event)} />
            {/* <input value={this.state.xl_picture_url} onChange={event => this.synchro(event)} type="url" name="xl_picture_url" placeholder="Image URL" className="pictureUrl" />
            <input value={this.state.xl_picture_url_2} onChange={event => this.synchro(event)} type="url" name="xl_picture_url_2" placeholder="Image URL" className="pictureUrl" />
            <input value={this.state.xl_picture_url_3} onChange={event => this.synchro(event)} type="url" name="xl_picture_url_3" placeholder="Image URL" className="pictureUrl" /> */}
          </label>

          <button className="add-button h6">Edit your place</button>
          </form>
      </section>
    )
  }
}

export default EditPlace;