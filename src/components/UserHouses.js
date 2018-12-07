import React, { Component } from "react";
import "./style/UserHouses.scss";
import { Link } from "react-router-dom";
import axios from "axios";

class UserHouses extends Component {
  componentDidMount() {
    window.scrollTo(0,0)
    axios.get("http://localhost:5555/api/userhouses", {withCredentials : true})
    .then(response => {
      console.log("HOUSES OWNER", response.data);
      this.props.onHouseChange(response.data);
    })
    .catch(err => {
      console.log("FAIL", err)
    })
  }

  deleteHouse(oneHouse, index) {

    axios.delete(`http://localhost:5555/api/deletehouse/${oneHouse._id}`, {withCredentials: true})
    .then(response => {
      console.log("HOUSE DELETED", response.data)
      console.log(this.props.userHousesArray)
      let copyUserHouseArray = [...this.props.userHousesArray];
      copyUserHouseArray.splice(index, 1);
      this.props.onHouseChange(copyUserHouseArray);

    })
    .catch(err => {
      console.log("STHG WRONG", err);
    })
  }

  getHouseIdUrl(oneHouse) {
    return `/edithouse/${oneHouse._id}`
  }

  render() {
    const { userHousesArray } = this.props;

    return(
      <section className="UserHouses">
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

              <div className="buttons">
                <button onClick={() => this.deleteHouse(oneHouse, index)} className="delete">Delete this house</button>
                <Link to={this.getHouseIdUrl(oneHouse)}><button className="edit">Edit this house</button></Link>
              </div>
            </li>
          )
        })}

      </section>
    )
  }
}

export default UserHouses;