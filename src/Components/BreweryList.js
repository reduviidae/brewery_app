import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

// css
import "../style/breweries.scss";

class BreweryList extends Component {
  componentDidMount() {
    this.fetchBreweries();
  }

  fetchBreweries() {
    fetch(
      `https://wilcook-brewery-api.herokuapp.com/breweries`,
      {
        method: `GET`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }
    )
      .then(r => r.json())
      .then(data => this.props.breweriesToState(data));
  }

  render() {
    let brewery = !this.props.selectedPlace.title ? (
      <div>Select a brewery</div>
    ) : (
      <Card>
        <Card.Body>
          <Card.Title>
            <h2>{this.props.selectedPlace.title}</h2>
          </Card.Title>
          <Card.Text>
            <h4>{`brewery type: ${this.props.selectedPlace.brewery_type}`}</h4>
            <p>
              {this.props.selectedPlace.street},{" "}
              {this.props.selectedPlace.state}{" "}
              {this.props.selectedPlace.postal_code}
            </p>
          </Card.Text>
          <Button className="btn" href={this.props.selectedPlace.website_url}>
            visit website
          </Button>
        </Card.Body>
      </Card>
    );
    return <div id="brewery">{brewery}</div>;
  }
}

const mapStateToProps = state => {
  return {
    selectedPlace: state.selectedPlace,
    page: state.page
  };
};

const mapDispatchToProps = dispatch => {
  return {
    breweriesToState: data => dispatch({ type: "GET_BREWERIES", payload: data })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BreweryList);
