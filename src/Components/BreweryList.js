import React, { Component } from "react";
import { connect } from "react-redux";

class BreweryList extends Component {
  componentDidMount() {
    this.fetchBreweries();
  }

  fetchBreweries() {
    fetch(`https://api.openbrewerydb.org/breweries?by_state=new_york`, {
      method: `GET`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
    .then(r => r.json())
    .then(data => this.props.breweriesToState(data))
}

render () {
  console.log(this.props.breweries);
return (
  <div>
  THIS IS WHERE THE BREWERIES GO
  </div>
)
}

};

const mapStateToProps = state => {
  return {
    breweries: state.breweries
  };
};

const mapDispatchToProps = dispatch => {
  return {
    breweriesToState: data => dispatch({type: "GET_BREWERIES", payload: data})
  }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(BreweryList);
