import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import './App.css';
import axios from 'axios';

class ParticularZip extends Component {

  render() {
      var {
          zip,
      } = this.props.data;
      return (
          <li>
              <p>{zip}</p>
          </li>
      );
  }
}

class CityInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [
            {
                Zip: "00000",
            }
        ]
    };
  }
  fetchZipData(city){
    axios.get("https://ctp-zip-api.herokuapp.com/city/" + city)
    .then(response => {
      var result = response.data;
      this.setState({data:result});
    })
    .catch(err => console.log(err));
  }

  render(){
    this.fetchZipData("QUEENS");
    return(
      <p>hello</p>
    );
  }
}


class App extends Component {
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
