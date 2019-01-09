import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class Cryptocurrency extends Component {

  render() {
      var {
          id,
          name,
          symbol,
          price_usd,
          percent_change_1h,
          percent_change_24h,
          percent_change_7d,
      } = this.props.data;
      return (
          <li className={"cryptocurrency " + id}>
              <p className="cryptocurrency-name">{name} ({symbol})</p>
              <h1>${ (+price_usd).toFixed(2) }</h1>
              <p>{percent_change_1h}% 1hr</p>
              <p>{percent_change_24h}% 24hrs</p>
              <p>{percent_change_7d}% 7days</p>
          </li>
      );
  }
}

class Tickers extends Component {

  constructor(props) {
      super(props);
      this.state = {
          data: [
              {
                  id: "bitcoin",
                  name: "Bitcoin",
                  symbol: "BTC",
                  price_usd: "1",
                  percent_change_1h: "0",
                  percent_change_24h: "0",
                  percent_change_7d: "0",
              },
              {
                  id: "ethereum",
                  name: "Ethereum",
                  symbol: "ETH",
                  price_usd: "1",
                  percent_change_1h: "0",
                  percent_change_24h: "0",
                  percent_change_7d: "0",
              },
              {
                  id: "litecoin",
                  name: "Litecoin",
                  symbol: "LTC",
                  price_usd: "1",
                  percent_change_1h: "0",
                  percent_change_24h: "0",
                  percent_change_7d: "0",
              }
          ]
      };
  }

  componentDidMount() {
      this.fetchCryptocurrencyData();
      this.interval = setInterval(() => this.fetchCryptocurrencyData(), 60 * 1000);
  }

  fetchCryptocurrencyData() {
      axios.get("https://api.coinmarketcap.com/v1/ticker/?limit=10")
          .then(response => {
              var wanted = ["bitcoin", "ethereum", "litecoin"];
              var result = response.data.filter(currency => wanted.includes(currency.id));
              this.setState({ data: result});
          })
          .catch(err => console.log(err));
  }

  render() {
      var tickers = this.state.data.map((currency) =>
          <Cryptocurrency data={currency} key={currency.id} />
      );
      return (
          <div className="tickers-container">
              <ul className="tickers">{tickers}</ul>
              <p>Information updated every minute courtesy of coinmarketcap.com</p>
         </div>
      );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
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
      </div>
    );
  }
}

export default App;
