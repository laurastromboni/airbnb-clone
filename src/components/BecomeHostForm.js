import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import "./style/BecomeHostForm.scss";
import axios from "axios";

import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import moment from "moment";

let blockedDates = [];


class BecomeHostForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      owner: "",
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

      isSubmitSuccessful: false,
      host_picture_url : this.props.currentUser && this.props.currentUser.avatar,
      startDate: null,
      endDate: null,
      focusedInput: null,
      availableDates: [],
      test: ""
    }
  }

  functionDatesChange = ({ startDate, endDate }) => { 
    this.setState({ startDate, endDate })
}

  functionFocusChange = (focusedInput) => { 
      this.setState({focusedInput})
  }

  componentDidMount(){
    window.scrollTo(0,0);
  }

  synchro(event) {
    const { name, value } = event.target;

    this.setState({[name]: value});
  }

  getDatesfromStartToEnd(){
    const arrayOfDates =[];
    var startDate = this.state.startDate;
    while (startDate <= this.state.endDate) {
      arrayOfDates.push( moment(startDate).format('YYYY-MM-DD') )
      startDate = moment(startDate).add(1, 'days');
    };
    return arrayOfDates
  }
  
  handleSubmit(event) {
    event.preventDefault();

    const {_id} = this.props.currentUser;
    this.setState({owner: _id, availableDates: this.getDatesfromStartToEnd()},()=> { 
    axios.post(process.env.REACT_APP_SERVER_URL + "/api/houses", this.state, { withCredentials: true })
    .then(response => {
      console.log("Add House", response.data);
      const newArray = [...this.props.userHousesArray];
      newArray.push(response.data);

      this.props.onHouseChange(newArray);

      this.setState({
        owner: "",
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
        host_picture_url : this.props.currentUser.avatar,
        isSubmitSuccessful: true,
      })
    })
    .catch(err => {
      console.log("Something went wrong...", err)
      alert("Complete all the forms")
    })
  });
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

  render() {

    const isDayBlocked = day => blockedDates.filter(d => d.isSame(day, 'day')).length > 0;
    
    if (this.state.isSubmitSuccessful) {
      return <Redirect to="/userhouses" />
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
            <p>Type</p> 
            
            {/* <input value={this.state.property_type} onChange={event => this.synchro(event)} type="text" name="property_type" placeholder="House, appartment..." className="two-col" /> */}
          
            <select name="property_type" value={this.state.room_type} onChange={event => this.synchro(event)} placeholder="House, appartment..." className="two-col">
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
            <p>Maximum accommodates</p> <input value={this.state.accommodates} onChange={event => this.synchro(event)} type="number" name="accommodates" placeholder="3" min="1" />
          </label>

          <label>
            <p>Amenities</p> <input value={this.state.amenities} onChange={event => this.synchro(event)} type="text" name="amenities" placeholder="Wifi, Heating, Free parking, Washer..." />
          </label>

          <label>
            <p>Bed(s)</p> <input value={this.state.beds} onChange={event => this.synchro(event)} type="number" name="beds" placeholder="2" min="1" />
          </label>

          <label>
            <p>Bedroom(s)</p> <input value={this.state.bedrooms} onChange={event => this.synchro(event)} type="number" name="bedrooms" placeholder="1" min="0" />
          </label>

          <label>
            <p>Bathroom(s)</p> <input value={this.state.bathrooms} onChange={event => this.synchro(event)} type="number" name="bathrooms" placeholder="1" min="1" />
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
            <p>Price</p> <input value={this.state.price} onChange={event => this.synchro(event)} type="number" name="price" placeholder="120 €" min="1" />
          </label>

          <label>
            <p>Images</p> 

            <input type="file" onChange={event => this.uploadImage(event)} name="xl_picture_url" className="pictureUrl" />
            <input type="file" onChange={event => this.uploadImage2(event)} name="xl_picture_url_2" className="pictureUrl" />
            <input type="file" onChange={event => this.uploadImage3(event)} name="xl_picture_url_3" className="pictureUrl" />

            {/* <img src={this.state.xl_picture_url} alt="" /> */}

            {/* <input value={this.state.xl_picture_url} onChange={event => this.synchro(event)} type="url" name="xl_picture_url" placeholder="Image URL 1" className="pictureUrl" />
            <input value={this.state.xl_picture_url_2} onChange={event => this.synchro(event)} type="url" name="xl_picture_url_2" placeholder="Image URL 2" className="pictureUrl" />
            <input value={this.state.xl_picture_url_3} onChange={event => this.synchro(event)} type="url" name="xl_picture_url_3" placeholder="Image URL 3" className="pictureUrl" /> */}
          </label>
          
          <p>Availables dates</p>
          <DateRangePicker
                      startDateId="blahStart"
                      endDateId="blahEnd"
                      startDate={this.state.startDate}
                      endDate={this.state.endDate}
                      onDatesChange = {dates=>this.functionDatesChange(dates)}
                      focusedInput={this.state.focusedInput}
                      onFocusChange={focused=>this.functionFocusChange(focused)}
                      isDayBlocked = {isDayBlocked}
                      startDatePlaceholderText = "Start"
                      endDatePlaceholderText = "End"
                    />

          <button className="add-button h6">Add your place</button>

        </form>

      </section>
    )
  }
}

export default BecomeHostForm;