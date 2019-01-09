import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class ZipInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      getSuccess: true,
      firstPage: true,
      zipCode: "Try 11102",
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
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleClick() {
    this.setState ({
      firstPage : !this.state.firstPage,
    });
  }
  handleChange (event) {
    this.setState({
      zipCode: event.target.value
    });
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
      this.setState({data:result, getSuccess:true});
    })
    .catch(err => {
      console.log(err);
      this.setState({getSuccess:false});
    });
  }

  render(){
    if (this.state.firstPage) {
      return (
        <div>
          <h1>Zip Code City Search</h1>
          <input type='text' value = {this.state.zipCode} onChange={this.handleChange}/>
          <button className= "button" onClick={this.handleClick}>Submit</button>
        </div>
      );
    } else {
      this.fetchZipData(this.state.zipCode);
      var cities = (<p>Zip Code Not Found</p>);
      if(this.state.getSuccess){
        cities = this.state.data.map((city)=>
          <ParticularCity data={city}/>
        );
      }
      return(
        <div>
        {cities}
        <button className= "button" onClick={this.handleClick}>Try Again</button>
        </div>
      );
    }
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
      <div className="container">
        <p className="locationText">{LocationText}</p>
        <p>Location: ({Lat}, {Long})</p>
        <p>Estimated Population: {EstimatedPopulation}</p>
        <p>Total Wages: {TotalWages}</p>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="centered">
        <ZipInfo zipcode="10016"/>
      </div>
    );
  }
}

export default App;
