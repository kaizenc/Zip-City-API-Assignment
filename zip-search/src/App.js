import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class ParticularCity extends Component {

  render() {
      var {
          locationText,
          lat,
          long,
          estimatedPopulation,
          totalWages,
      } = this.props.data;
      return (
          <li>
              <p>{locationText}</p>
              <p>{lat}</p>
              <p>{long}</p>
              <p>{estimatedPopulation}</p>
              <p>{totalWages}</p>
          </li>
      );
  }
}

class ZipInfo extends Component {

}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Cryptocurrency Ticker</h2>
        </div>
        <Tickers />
      </div>
    );
  }
}

export default App;
