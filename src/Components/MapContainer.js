// packages
import React, { Component } from "react";
import { Map, Marker, InfoWindow, GoogleApiWrapper } from "google-maps-react";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";

// css
import "../style/map.scss";

const envKey = process.env.REACT_APP_MAP_KEY;

class MapContainer extends Component {

  render() {
    let startLng = this.props.breweries[0] ? this.props.breweries[0].longitude : -86.774322;
    let startLat = this.props.breweries[0] ? this.props.breweries[0].latitude : 33.524521;
    const markers = this.props.breweries.map(b => {
      return (
        <Marker
          key={b.id}
          onClick={this.props.selectMarker}
          title={b.name}
          brewery_type={b.brewery_type}
          street={b.street}
          state={b.state}
          postal_code={b.postal_code}
          website_url={b.website_url}
          position={{ lat: b.latitude, lng: b.longitude }}
        />
      );
    });
    return (
      <Container id="map">
        <Map
          google={this.props.google}
          zoom={6}
          initialCenter={{
            lat: startLat,
            lng: startLng
          }}
        >
          {markers}
          <InfoWindow
            marker={this.props.activeMarker}
            visible={this.props.infoWindowVisible}>
            <div id="infoWindow">
              <h4>{this.props.selectedPlace && this.props.selectedPlace.title}</h4>
            </div>
            </InfoWindow>
        </Map>
      </Container>
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
