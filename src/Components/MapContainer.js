// packages
import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import { connect } from "react-redux";

// css
import "../style/map.scss";

const envKey = process.env.REACT_APP_MAP_KEY;

class MapContainer extends Component {
  render() {
    console.log(this.props.breweries);
    const markers = this.props.breweries.map(b => {
      return (
        <Marker
        title={b.name}
        name={b.name}
        position={{lat: b.latitude, lng: b.longitude}}
        />
      )
    })
    return (
      <div id="map">
        <Map
          google={this.props.google}
          zoom={5}
          initialCenter={{
            lat: 40.64642,
            lng: -73.95999
          }}
        >
        {markers}
        </Map>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    breweries: state.breweries
  };
};

export default connect(mapStateToProps)(
  GoogleApiWrapper({
    apiKey: envKey
  })(MapContainer)
);
