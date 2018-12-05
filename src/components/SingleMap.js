import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import mapicon from '../images/map-icon.svg';
import {Link} from "react-router-dom"

import './style/SingleMap.scss';
import './style/FontColors.scss';

function houseUrl(oneHouse){
    return `/houses/${oneHouse.recordid}`;
  }
const AnyReactComponent = ({ oneloc }) => <div>{<Link to={houseUrl(oneloc)}><img className = "map-icon" src={mapicon} alt="map" /></Link>}</div>;
 
class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 37.787994,
      lng: -122.407437
    },
    zoom: 12
  };

  
  
  render() {
    const {geoloc}=this.props
    console.log("geoloc",geoloc)
    console.log("this.props.gps",this.props.gps)

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