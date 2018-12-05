import React, { Component } from "react";
import { Link } from "react-router-dom";

import './style/Footer.scss';
import './style/FontColors.scss';

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
          <a href="https://www.airbnb.com/careers"><li><h5>Careers</h5></li></a>
          <a href="https://www.airbnb.com/press/news"><li><h5>Press</h5></li></a>
          <a href="https://www.airbnb.com/policies"><li><h5>Policies</h5></li></a>
          <a href="https://www.airbnb.com/help?from=footer"><li><h5>Help</h5></li></a>
          <a href="https://www.airbnb.com/diversity"><li><h5>Careers</h5></li></a>
        </ul>
        <ul className="col-lg-3">
          <h5><b>Discover</b></h5>
          <a href="https://www.airbnb.com/trust"><li><h5>Trust & Safety</h5></li></a>
          <a href="https://www.airbnb.com/invite?r=6"><li><h5>Invite Friends</h5></li></a>
          <a href="https://www.airbnb.com/gift?s=footer"><li><h5>Gift Cards</h5></li></a>
          <a href="https://www.airbnbcitizen.com/?utm_source=airbnb&utm_medium=footer&utm_campaign=product"><li><h5>AirBnb Citizen</h5></li></a>
          <a href="https://www.airbnbforwork.com/?utm_source=airbnb&utm_medium=footer&utm_campaign=product"><li><h5>Business Travel</h5></li></a>
          <a href="https://www.airbnb.com/things-to-do"><li><h5>Guidebooks</h5></li></a>
          <a href="https://airbnbmag.com/"><li><h5>Airbnbmag</h5></li></a>
          <a href="https://www.airbnb.com/events"><li><h5>Events</h5></li></a>
        </ul>
        <ul className="col-lg-3">
          <h5><b>Hosting</b></h5>
          <a href="https://www.airbnb.com/host/homes?from_footer=1"><li><h5>Why Host</h5></li></a>
          <a href="https://www.airbnb.com/hospitality"><li><h5>Hospitality</h5></li></a>
          <a href="https://www.airbnb.com/help/responsible-hosting"><li><h5>Responsible Hosting</h5></li></a>
          <a href="https://www.airbnb.com/help/community?s=footer"><li><h5>Community Center</h5></li></a>
          <a href="https://www.airbnb.com/host/experiences?from_footer=1"><li><h5>Host an Experience</h5></li></a>
          <a href="https://www.airbnb.com/openhomes?from_footer=1"><li><h5>Open Homes</h5></li></a>
        </ul>
        <ul className="col-lg-3">
          <div className="social-medias">
            <a href="https://instagram.com/airbnb"><img src={ig} className="icon" alt="icon" /></a>
            <a href="https://twitter.com/airbnb"><img src={tw} className="icon" alt="icon" /></a>
            <a href="https://www.facebook.com/airbnb"><img src={fb} className="icon" alt="icon" /></a>
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