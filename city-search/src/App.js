import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class CityInfo extends Component {
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
      <ParticularZip data={zipcode}/>
    );
    return(
      <ul>{zipcodes}</ul>
    );
  }
}

class ParticularZip extends Component {
  render() {
      let zip = this.props.data;
      return (
          <li>
              <p>{zip}</p>
          </li>
      );
  }
}


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      firstPage: false,
    }
  }
  render() {
    if (this.state.firstPage) {
      return (
          <div className = "divMain">
              <p className= "textFirst">{this.state.fname}</p>
              <p className= "textFirst">{this.state.lname}</p>
              <button className= "buttom" onClick={this.handleClickEdit}>Edit</button>
          </div>
      );
  } else {
      return (
          <div className = "divMain">
              <p>You can edit First name and Last name here: </p>
              <p><input className= "textSecond" type='text' value={this.state.fname} onChange={this.handleFNameChange}/></p>
              <p><input className= "textSecond" type='text' value={this.state.lname} onChange={this.handleLNameChange}/></p>
              <p><button className= "buttom" onClick={this.handleClickSave}>Save</button></p>
              <p><button className= "buttom" onClick={this.handleClickCancel}>Cancel</button></p>
         </div>

      );
  }
  }
}

export default App;
