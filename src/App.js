import React, { Component } from 'react';

import UserInput from './components/UserInput';
import Calendar from './containers/Calendar';
import StockEntry from './components/StockEntry';
import stocksTimingFilter from 'utils/stocksTimingFilter';
import performStockLookup from 'utils/performStockLookup';

class App extends Component {
  componentDidMount() {
    this.setState({
      stocks: [
        {"name":"Facebook, Inc.","price":217.94,"symbol":"FB","earningsDate":"2020-01-29T21:00:00.000Z"},
        {"name":"Apple Inc.","price":318.31,"symbol":"AAPL","earningsDate":"2020-01-28T21:00:00.000Z"},
        {"name":"Amazon.com, Inc.","price":1861.64,"symbol":"AMZN","earningsDate":"2020-01-30T21:00:00.000Z"},
        {"name":"Netflix, Inc.","price":353.16,"symbol":"NFLX","earningsDate":"2020-01-21T16:00:03.000Z"},
        {"name":"Alphabet Inc.","price":1466.17,"symbol":"GOOGL","earningsDate":"2020-02-03T21:00:00.000Z"}
      ],
      displayList: [],
      selectedDay: null,
      errorMessage: null,
      lastEnteredValue: document.querySelector('#ticketsInput').value,
    });
  }

  state = { stocks: [] };

  onDaySelected(day = this.state.selectedDay) {
    if (this.state.stocks && this.state.stocks.length && day) {
      const displayList = stocksTimingFilter(this.state.stocks, day.selected, 'day');
      this.setState({ displayList, selectedDay: day });
    }
  }

  async onTickerSubmit() {
    const userEnteredValue = document.querySelector('#ticketsInput').value;
    if (userEnteredValue === this.state.lastEnteredValue) return;

    const stocks = await performStockLookup(userEnteredValue);
    if (stocks.error) {
      this.setState({ errorMessage: stocks.message })
      return;
    }
    
    this.setState({ stocks, error: false, errorMessage: null,  lastEnteredValue: userEnteredValue });
    this.onDaySelected();
  }

  render() {
    return (
      <>
        <UserInput onTickerSubmit={this.onTickerSubmit.bind(this)} errorMessage={this.state.errorMessage} />
        <Calendar stocks={this.state.stocks} daySelectionMade={this.onDaySelected.bind(this)} />
        { this.state.displayList && this.state.displayList.map(visibleStocks => <StockEntry key={visibleStocks.symbol} {...visibleStocks} />)}
      </>
    );
  }
}

export default App;
