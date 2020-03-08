import React, { Component } from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
// import GoogleMapReact from 'google-map-react';
 
// const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
class MapComp extends Component {
    constructor(props){
        super(props);
        
    }
//   static defaultProps = {
//     center: {
//       lat: 19.107149,
//       lng: 72.8373155
//     },
//     zoom: 11
//   };
 
  render() {
      
    return (

        <LeafletMap
        center={[this.props.latitude,this.props.longitude]}
        zoom={6}
        maxZoom={20}
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
      >
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Marker position={[this.props.latitude,this.props.longitude]}>
          <Popup>
            Popup for any custom information.
          </Popup>
        </Marker>
      </LeafletMap>
    //   // Important! Always set the container height explicitly
    //   <div style={{ height: '30rem', width: '100%' }}>
    //     <GoogleMapReact
    //       bootstrapURLKeys={{ key:'AIzaSyAyt2k0nlb6ZLOTThboDte6vjDq_zYBsG8'}}
    //       defaultCenter={this.props.center}
    //       defaultZoom={this.props.zoom}
    //     >
    //       <AnyReactComponent
    //         lat={this.props.latitude}
    //         lng={this.props.longitude}
    //         text="My Marker"
    //       />
    //     </GoogleMapReact>
    //   </div>
     );
  }
}
 
export default MapComp;

// import React,{Component} from 'react';
// import Geocode from "react-geocode";
// import axios from 'axios';
 


// function MapComp(props) {    
    

// return ( 

//     <React.Fragment>
//         <div>
        
//         </div>
//     </React.Fragment>
//  );

// }

// export default MapComp;

