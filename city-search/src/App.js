import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class CityInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
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
      this.setState({zipcodes:result});
    })
    .catch(err => console.log(err));
  }

  handleClick() {
    var upperCaseCity = this.state.city.toUpperCase();
      this.setState ({
          firstPage : false,
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
            <h1>City Search </h1>
            <p>City: <input type='text' value = {this.state.city} onChange={this.handleChange}/></p>
              
              <button className= "buttom" onClick={this.handleClick}>Edit</button>
          </div>
      );
  } else {
      this.fetchCityData(this.state.city);
      var zipcodes = this.state.zipcodes.map((zipcode)=>
      <ParticularZip data={zipcode}/>
    );
    var correctCity = this.state.city.toLowerCase();
    correctCity = correctCity.charAt(0).toUpperCase() + correctCity.slice(1);
    return(
      <div>
        <h1>City Search Results</h1>
        <h2>City: {correctCity}</h2>
        <ul>{zipcodes}</ul>
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
