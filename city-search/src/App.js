import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class CityInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      firstPage: true,
      zipcodes: ["10010"] ,
      city: "QUEENS",
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  fetchCityData(city){
    axios.get("https://ctp-zip-api.herokuapp.com/city/" + city)
    .then(response => {
      var result = response.data;
      this.setState({zip:result});
    })
    .catch(err => console.log(err));
  }

  handleClick() {
      this.setState ({
          firstPage : false,
      });
  }
  handleChange (event) {
    this.setState({
        city: event.target.value
    });
}
  render() {
    if (this.state.firstPage) {
      return (
          <div >
              <input type='text' value = {this.state.city} onChange={this.handleChange}/>
              <button className= "buttom" onClick={this.handleClick}>Edit</button>
          </div>
      );
  } else {
      this.fetchCityData(this.props.city);
      var zipcodes = this.state.zipcodes.map((zipcode)=>
      <ParticularZip data={zipcode}/>
    );
    return(
      <ul>{zipcodes}</ul>
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
