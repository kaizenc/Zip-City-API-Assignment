import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class CityInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      getSuccess: true,
      firstPage: true,
      zipcodes: ["Can't find this city"] ,
      city: "Try New York",
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  fetchCityData(city){
    axios.get("https://ctp-zip-api.herokuapp.com/city/" + city)
    .then(response => {
      var result = response.data;
      this.setState({zipcodes:result, getSuccess:true});
    })
    .catch(err => {
      console.log(err);
      this.setState({getSuccess:false});
    });
  }

  handleClick() {
    var upperCaseCity = this.state.city.toUpperCase();
    if (!this.state.firstPage) {
      upperCaseCity = "Try New York"
    };
      this.setState ({
          firstPage : !this.state.firstPage,
          city: upperCaseCity,
      });
  }
  handleChange (event) {
    
    this.setState({
        city:  event.target.value
    });
}
  render() {
    if (this.state.firstPage) {
      return (
          <div >
            <h1 className = "App-header">City Search </h1>
            <h2  className = "App-subheader">City: <input classname="inputLine" type='text' value = {this.state.city} onChange={this.handleChange}/></h2>
              
              <button className= "button" onClick={this.handleClick}>Submit</button>
          </div>
      );
  } else {
      this.fetchCityData(this.state.city);
      var zipcodes = (<p>City Not Found</p>);
      if(this.state.getSuccess){
        var zipcodes = this.state.zipcodes.map((zipcode)=>
        <ParticularZip data={zipcode}/>
        );
      }; 
    var correctCity = this.state.city.toLowerCase();
    correctCity = correctCity.charAt(0).toUpperCase() + correctCity.slice(1);
    return(
      <div>
        <h1 className = "App-header">City Search Results</h1>
        <h2 className = "App-subheader">City: {correctCity}</h2>
        <ul className = "zipList">{zipcodes}</ul>
        <button className= "button" onClick={this.handleClick}>Try Again</button>
      </div>

    );
  }
  }
}
class ParticularZip extends Component {

  render() {
      var zip   = this.props.data;
      return (
          <li>
              <p>{zip}</p>
              
          </li>
      );
  }
}


class App extends Component {
  render() {
      return (
          <div>
            <CityInfo />
          </div>

      );
  }
}

export default App;
