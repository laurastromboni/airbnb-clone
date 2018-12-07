import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style/BecomeHost.scss";

class BecomeHost extends Component {

  render() {
      return(
        <section className="BecomeHost">
          <div className="cover">
            <div className="ready">
              <h1>Ready to earn ?</h1>
              <Link to="/becomehostform"><button className="become-button">Get started</button></Link>    
            </div>
          </div>
        </section>
      )
  }
  
}

export default BecomeHost;