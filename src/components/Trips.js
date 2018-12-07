import React, { Component } from "react";

import {Link} from "react-router-dom";

import "./style/Trips.scss"

class Trips extends Component {

  componentDidMount(){
    window.scrollTo(0,0)
  }

  render() {
    return(
      <section className="Trips">
        <div className="upcoming">
          <h2>Upcoming Trips</h2>
          <p>You have no upcoming trips. Start exploring ideas for your next trip.</p>
          <div className="cover"></div>
        </div>
        <div className="been">
          <h2>Where you’ve been</h2>
          <p>You have not been anywhere yet. Check our cool places now !</p>
          <Link to="/houses"><button className="booking-button h6">Find places</button></Link>
        </div>
      </section>
    )
  }
}

export default Trips;


