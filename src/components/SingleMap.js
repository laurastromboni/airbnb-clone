import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import mapicon from '../images/map-icon.svg';
import {Link} from "react-router-dom"
import Popup from "reactjs-popup";
import StarRatingComponent from 'react-star-rating-component';

import './style/SingleMap.scss';
import './style/FontColors.scss';

function houseUrl(oneHouse){
    return `/houses/${oneHouse._id}`;
  }
const AnyReactComponent = ({ oneloc }) => <div className="PopupMap">
                            {<Popup trigger={<img className = "map-icon" src={mapicon} alt="map" />}>
                                <p>{oneloc.name}</p>
                                <img className="littlePic" src={oneloc.xl_picture_url} alt="" />
                                <h5>{oneloc.price}$ per night</h5>
                                <div className="details">
                                  <StarRatingComponent 
                                  name="rate1" 
                                  editing={false}
                                  starCount={5}
                                  value={Math.round(oneloc.review_scores_rating/20)}
                                  />
                                  <Link to={houseUrl(oneloc)}><u>See details</u></Link>
                                </div>
                            </Popup>}
                            </div>;
 

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 37.787994,
      lng: -122.407437
    },
    zoom: 12
  };
  
  
  render() {
    // const {geoloc}=this.props
    // console.log("geoloc",geoloc)
    // console.log("this.props.gps",this.props.gps)
    console.log("haloooo", {
      env: process.env.REACT_APP_GOOGLE_MAPS_API,
      gps: this.props.gps,
      zoom: this.props.zoom,
    })

    return (
      // Important! Always set the container height explicitly
      <div className="SingleMap" style={{ height: '80vh', width: '100%' }} id="SingleMap">
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API }}
          center={this.props.gps}
          defaultZoom={this.props.zoom}
        >
        {this.props.geoloc.map(oneloc=>{
            return(
                    <AnyReactComponent
                      lat={oneloc.geopoint[0]}
                      lng={oneloc.geopoint[1]}
                      oneloc={oneloc}
                    />

            )
        })}
        </GoogleMapReact>
        
      </div>
    );
  }
}
 
export default SimpleMap;