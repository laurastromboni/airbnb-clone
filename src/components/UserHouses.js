import React, { Component } from "react";
import "./style/UserHouses.scss";
import { Link } from "react-router-dom";
import axios from "axios";

class UserHouses extends Component {
  componentDidMount() {
    window.scrollTo(0,0)
    axios.get(process.env.REACT_APP_SERVER_URL + "/api/userhouses", {withCredentials : true})
    .then(response => {
      console.log("HOUSES OWNER", response.data);
      this.props.onHouseChange(response.data);
    })
    .catch(err => {
      console.log("FAIL", err)
    })
  }

  deleteHouse(oneHouse, index) {

    axios.delete(process.env.REACT_APP_SERVER_URL + `/api/deletehouse/${oneHouse._id}`, {withCredentials: true})
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

  houseUrl(oneHouse){
    return `/houses/${oneHouse._id}`;
  }

  render() {
    const { userHousesArray } = this.props;

    return(
      <section className="UserHouses">
        <h2>Your places</h2>
        <p>Here you can find the places you've added.</p>
        { userHousesArray.length !== 0 ?
        <div className="col-lg-12 saved-list">
          <ul>
          {userHousesArray.map((oneHouse, index) => {
            return(
              <li key={oneHouse._id} className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                <div className="place-img"><img src={oneHouse.xl_picture_url} alt="pic" /></div>
                <Link to={this.houseUrl(oneHouse)}><h4>{oneHouse.name}</h4></Link>
                <h5>{oneHouse.price} $ per night</h5>

                <div className="buttons">
                  <button onClick={() => this.deleteHouse(oneHouse, index)} className="delete col-lg-5">Delete</button>
                  <button className="edit col-lg-5"><Link to={this.getHouseIdUrl(oneHouse)}>Edit</Link></button>
                </div>
              </li>
            )
          })}
          </ul>
        </div>
        :
        <div className="col-lg-12 more">
          <h1><b>0</b></h1>
        </div>
        }
        <Link to="/becomehostform"><button className="add">Add new place</button></Link>
      </section>
    )
  }
}

export default UserHouses;