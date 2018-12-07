import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style/BecomeHost.scss";

import step1 from "../images/becomeahost-icon-1.jpg";
import step2 from "../images/becomeahost-icon-2.jpg";
import step3 from "../images/becomeahost-icon-3.jpg";
import host from "../images/becomeahost-3.jpg";
import more1 from "../images/becomeahost-6.jpg";
import more2 from "../images/becomeahost-5.jpg";
import more3 from "../images/becomeahost-8.jpg";

class BecomeHost extends Component {

  componentDidMount(){
    window.scrollTo(0,0)
  }

  render(){
      return(

        <section className="BecomeHost">

          <div className="cover">
            <div className="ready">
              <h1>Are you ready ?</h1>
              <p>Earn money as an Airbnb host</p>
              <Link to="/becomehostform"><button className="become-button">Get started</button></Link>    
            </div> 
          </div>

          <div className="col-lg-12 why">
            <div className="col-lg-6 col-sm-12 why-content">
              <h2>Why host on Airbnb?</h2>
              <p>No matter what kind of home or room you have to share, Airbnb makes it simple and secure to host travelers. You’re in full control of your availability, prices, house rules, and how you interact with guests.</p>
            </div>
            <div className="col-lg-6 col-sm-12 why-content">
              <h2>We have your back</h2>
              <p>To keep you, your home, and your belongings safe, we cover every booking with $1M USD in property damage protection and another $1M USD in insurance against accidents.</p>
            </div>
          </div>

          <div className="col-lg-12 steps">
            <hr />
            <h1>Hosting in 3 steps</h1>
            <div className="col-lg-12 step-list">
              <div className="col-lg-4 one-step">
                <img src={step1} alt="step-1" />
                <h3>List your space for free</h3>
                <p>Share any space without sign-up charges, from a shared living room to a second home and everything in-between.</p>
              </div>
              <div className="col-lg-4 one-step">
                <img src={step2} alt="step-2" />
                <h3>Decide how you want to host</h3>
                <p>Choose your own schedule, prices, and requirements for guests. We’re there to help along the way.</p>
              </div>
              <div className="col-lg-4 one-step">
                <img src={step3} alt="step-3" />
                <h3>Once your listing is live, qualified guests can reach out.</h3>
                <p>Share any space without sign-up charges, from a shared living room to a second home and everything in-between.</p>
              </div>
            </div>
          </div>

          <div className="col-lg-12 host">
            <div className="col-lg-6 host-left">
              <div className="big-arrow">“</div>
              <h3>The Host Guarantee helped me decide to join Airbnb because I have it to fall back on if there's damage or problems.</h3>
              <p>Dennis hosts in London for the flexibility it provides</p>
              <button className="become-button">Become a Host</button>
            </div>
            <div className="col-lg-6 host-right">
              <img src={host} alt="host"/>
            </div>
          </div>

          <div className="col-lg-12 steps worldwide">
            <hr />
            <h1>Hosts like you, worldwide</h1>
            <div className="col-lg-12 step-list">
              <div className="col-lg-4 one-step">
                <h1 className="h1">2.9M</h1>
                <p>Hosts on Airbnb</p>
              </div>
              <div className="col-lg-4 one-step">
                <h1 className="h1">800K</h1>
                <p>Average Airbnb stays each night</p>
              </div>
              <div className="col-lg-4 one-step">
                <h1 className="h1">14K</h1>
                <p>New hosts per month</p>
              </div>
            </div>
          </div>

          <div className="col-lg-12 steps more">
            <h3>More about hosting</h3>
            <div className="col-lg-12 step-list">
              <div className="col-lg-4 col-md-4 one-step">
                <img src={more1} alt="more1-pic"/>
                <h4>Setup</h4>
                <p>How to start hosting</p>
                <a href="https://www.airbnb.com/b/setup"><p className="p">Learn more</p></a>
              </div>
              <div className="col-lg-4 col-md-4 one-step">
                <img src={more2} alt="more2-pic"/>
                <h4>Safety</h4>
                <p>How Airbnb protects hosts</p>
                <a href="https://www.airbnb.com/b/safety"><p className="p">Learn more</p></a>
              </div>
              <div className="col-lg-4 col-md-4 one-step">
                <img src={more3} alt="more3-pic"/>
                <h4>Financials</h4>
                <p>How you make money on Airbnb</p>
                <a href="https://www.airbnb.com/b/financials"><p className="p">Learn more</p></a>
              </div>
            </div>
          </div>

          <div className="cover2"><Link to="/becomehostform"><button className="h6">Get started</button></Link></div>

        </section>

    )}}

    export default BecomeHost;