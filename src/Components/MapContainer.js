// packages
import React, { Component } from "react";
import { Map, Marker, InfoWindow, GoogleApiWrapper } from "google-maps-react";
import { connect } from "react-redux";

// css
import "../style/map.scss";

const envKey = process.env.REACT_APP_MAP_KEY;

class MapContainer extends Component {
  componentWillReceiveProps(nextProps){
    console.log(this.props.selectedPlace);
    console.log(this.props.activeMarker);
  }

  render() {
    const markers = this.props.breweries.map(b => {
      return (
        <Marker
          key={b.id}
          onClick={this.props.selectMarker}
          title={b.name}
          type={b.type}
          street={b.street}
          state={b.state}
          postal_code={b.postal_code}
          website_url={b.website_url}
          position={{ lat: b.latitude, lng: b.longitude }}
        />
      );
    });
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
          <InfoWindow
            marker={this.props.activeMarker}
            visible={this.props.infoWindowVisible}>
            <div id="infoWindow">
              <h1>{this.props.selectedPlace && this.props.selectedPlace.title}</h1>
              <h2>{this.props.selectedPlace.type}</h2>
              <p>{`${this.props.selectedPlace.street}, ${this.props.selectedPlace.state} ${this.props.selectedPlace.postal_code}`}</p>
            </div>
            </InfoWindow>
        </Map>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    breweries: state.breweries,
    activeMarker: state.activeMarker,
    selectedPlace: state.selectedPlace,
    infoWindowVisible: state.infoWindowVisible
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectMarker: (props, marker) =>
      dispatch({ type: "SELECT_MARKER", props: props, marker: marker })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  GoogleApiWrapper({
    apiKey: envKey
  })(MapContainer)
);
