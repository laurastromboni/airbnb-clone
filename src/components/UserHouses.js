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

  render() {
    const { userHousesArray } = this.state;

    return(
      <section className="user-houses">
        <h2>See all of your houses</h2>

        {userHousesArray.map((oneHouse, index) => {
          return(
            <li key={oneHouse._id}>
              <h2>{oneHouse.title}</h2>
              <p>{oneHouse.description}</p>

              <p>{oneHouse.property_type}</p>
              <p>{oneHouse.room_type}</p>
              <p>{oneHouse.accomodates}</p>
              <p>{oneHouse.beds} beds</p>
              <p>{oneHouse.bedrooms} bedroom(s)</p>
              <p>{oneHouse.bathrooms} bathroom(s)</p>
              <p>{oneHouse.neighbourhoods}</p>
              <p>{oneHouse.amenities}</p>
              <p>{oneHouse.country}</p>
              <p>{oneHouse.price} $</p>
              <img src={oneHouse.picture_url} />

              <button onClick={() => this.deleteHouse(oneHouse, index)}>Delete this house</button>
            </li>
          )
        })}

        <Link to="/edithouse"><button>Edit your house</button></Link>
      </section>
    )
  }
}

export default UserHouses;