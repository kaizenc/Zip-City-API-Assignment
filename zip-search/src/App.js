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
      var result = response.data.map(city => {
        return {
          LocationText: city.LocationText,
          State: city.State,
          Lat: city.Lat,
          Long: city.Long,
          EstimatedPopulation: city.EstimatedPopulation,
          TotalWages: city.TotalWages,
        };
      });
      this.setState({data:result});
    })
    .catch(err => console.log(err));
  }

  render(){
    this.fetchZipData(this.props.zipcode);
    var cities = this.state.data.map((city)=>
      <ParticularCity data={city}/>
    );
    return(
      <p>{cities}</p>
    );
  }
}

class ParticularCity extends Component {
  render(){
      var {
          LocationText,
          Lat,
          Long,
          EstimatedPopulation,
          TotalWages,
      } = this.props.data;
      return (
          <li>
              <p>{LocationText}</p>
              <p>{Lat}</p>
              <p>{Long}</p>
              <p>{EstimatedPopulation}</p>
              <p>{TotalWages}</p>
          </li>
      );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Cryptocurrency Ticker</h2>
        </div>
        <ZipInfo zipcode="10016"/>
      </div>
    );
  }
}

export default App;
