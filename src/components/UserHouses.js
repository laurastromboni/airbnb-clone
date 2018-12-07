import React, { Component } from "react";
import "./style/UserHouses.scss";
import { Link } from "react-router-dom";
import axios from "axios";

class UserHouses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userHousesArray: []
    }
  }

  componentDidMount() {
    window.scrollTo(0,0)
    axios.get("http://localhost:5555/api/userhouses", {withCredentials : true})
    .then(response => {
      console.log("HOUSES OWNER", response.data);
      this.setState({userHousesArray: response.data});
    })
    .catch(err => {
      console.log("FAIL", err)
    })
  }

  deleteHouse(oneHouse, index) {

    axios.delete(`http://localhost:5555/api/deletehouse/${oneHouse._id}`, {withCredentials: true})
    .then(response => {
      console.log("HOUSE DELETED", response.data)
      console.log(this.state.userHousesArray)
      let copyUserHouseArray = [...this.state.userHousesArray];
      copyUserHouseArray.splice(index, 1);
      this.setState({userHousesArray: copyUserHouseArray});

    })
    .catch(err => {
      console.log("STHG WRONG", err);
    })
  }

  getHouseIdUrl(oneHouse) {
    return `/edithouse/${oneHouse._id}`
  }

  render() {
    const { userHousesArray } = this.state;

    return(
      <section className="user-houses">
        <h2>See all of your houses</h2>

        {userHousesArray.map((oneHouse, index) => {
          return(
            <li key={oneHouse._id}>
              <h3>{oneHouse.name}</h3>
              <p>{oneHouse.description}</p>

              <p>Property type: {oneHouse.property_type}</p>
              <p>Room type: {oneHouse.room_type}</p>
              <p>Accomodates: {oneHouse.accomodates}</p>
              <p>{oneHouse.beds} beds</p>
              <p>{oneHouse.bedrooms} bedroom(s)</p>
              <p>{oneHouse.bathrooms} bathroom(s)</p>
              <p>Neighbourhood: {oneHouse.neighbourhoods}</p>
              <p>Amenities: {oneHouse.amenities}</p>
              <p>Country: {oneHouse.country}</p>
              <p>{oneHouse.price} $</p>
              <img src={oneHouse.picture_url} alt="pic" />

              <Link to={this.getHouseIdUrl(oneHouse)}><button>Edit this house</button></Link>
              <button onClick={() => this.deleteHouse(oneHouse, index)}>Delete this house</button>
              <hr />
            </li>
          )
        })}

        <Link to="/edithouse"><button>Edit your house</button></Link>
      </section>
    )
  }
}

export default UserHouses;