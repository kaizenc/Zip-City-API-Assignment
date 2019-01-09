import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class ZipInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      zipcodes: ["11102"],
    };
  }
  fetchZipCodes(cityName){
    axios.get("https://ctp-zip-api.herokuapp.com/city/" + cityName)
    .then(response => {
      var result = response.data;
      this.setState({zipcodes:result});
      console.log(this.state.zipcodes);
    })
    .catch(err => console.log(err));
  }

  render(){
    this.fetchZipCodes(this.props.cityName);
    var zipcodes = this.state.zipcodes.map((zipcode)=>
      <li>{zipcode}</li>
    );
    return(
      <ul>{zipcodes}</ul>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          City Search
        </header>
        <ZipInfo cityName="SPRINGFIELD"/>
      </div>
    );
  }
}

export default App;
