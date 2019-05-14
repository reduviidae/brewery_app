import React, { Component } from "react";
import { connect } from "react-redux";

// css
import "../style/breweries.scss";

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
      .then(data => this.props.breweriesToState(data));
  }

  render() {
    const breweries = this.props.breweries.map(b => {
      return (
        <div key={b.id} className="brewery">
          <h2>{b.name}</h2>
          <p>{b.type}</p>
          <p>
            {b.street}, {b.state} {b.postal_code}
          </p>
          <a href={b.website_url}>{b.website_url}</a>
        </div>
      )
    });
    return <div id="breweries">{breweries}</div>;
  }
}

const mapStateToProps = state => {
  return {
    breweries: state.breweries
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
