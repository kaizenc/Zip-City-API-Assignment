import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class ZipInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [
            {
                LocationText: "CityName",
                State: "StateName",
                Lat: "0",
                Long: "0",
                EstimatedPopulation: "0",
                TotalWages: "1",
            }
        ]
    };
  }
  fetchZipData(zipcode){
    axios.get("https://ctp-zip-api.herokuapp.com/zip/" + zipcode)
    .then(response => {
      var wanted = ["LocationText", "State", "Lat", "Long", "EstimatedPopulation", "TotalWages"];
      var result = response.data.filter(currency => wanted.includes(currency.id));
      this.setState({data:result});
    })
    .catch(err => console.log(err));
  }

  render(){
    this.fetchZipData(10016);
    return(
      <p>hello</p>
    );
  }
}

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
<<<<<<< HEAD
        <div className="App-header">
          <h2>Cryptocurrency Ticker</h2>
        </div>
        <Tickers />
=======
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <ZipInfo />
>>>>>>> kaizen
      </div>
    );
  }
}

export default App;
