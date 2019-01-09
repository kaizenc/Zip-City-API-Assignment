import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

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
