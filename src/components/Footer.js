import React, { Component } from "react";

import './Footer.scss';
import './FontColors.scss';

import logoGrey from '../images/logo-grey.svg';
import ig from '../images/ig.svg';
import tw from '../images/tw.svg';
import fb from '../images/fb.svg';

class Footer extends Component{

  render(){
    return(
      <section className="Footer col-lg-12">
      <div className="list">
        <ul className="col-lg-3">
          <h5><b>Airbnb</b></h5>
          <li><h5>Careers</h5></li>
          <li><h5>Press</h5></li>
          <li><h5>Policies</h5></li>
          <li><h5>Help</h5></li>
          <li><h5>Careers</h5></li>
        </ul>
        <ul className="col-lg-3">
          <h5><b>Discover</b></h5>
          <li><h5>Trust & Safety</h5></li>
          <li><h5>Invite Friends</h5></li>
          <li><h5>Gift Cards</h5></li>
          <li><h5>AirBnb Citizen</h5></li>
          <li><h5>Business Travel</h5></li>
          <li><h5>Guidebooks</h5></li>
          <li><h5>Airbnbmag</h5></li>
          <li><h5>Events</h5></li>
        </ul>
        <ul className="col-lg-3">
          <h5><b>Hosting</b></h5>
          <li><h5>Why Host</h5></li>
          <li><h5>Refer Hosts</h5></li>
          <li><h5>Hospitality</h5></li>
          <li><h5>Responsible Hosting</h5></li>
          <li><h5>Community Center</h5></li>
          <li><h5>Host an Experience</h5></li>
          <li><h5>Open Homes</h5></li>
        </ul>
        <ul className="col-lg-3">
          <div className="social-medias">
            <img src={ig} className="icon" alt="icon" />
            <img src={tw} className="icon" alt="icon" />
            <img src={fb} className="icon" alt="icon" />
          </div>
        </ul>
      </div>
      <hr />
      <img src={logoGrey} className="logo" alt="logo" />
      </section>
    )
  }

}

export default Footer;