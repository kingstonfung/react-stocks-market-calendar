import React, { Component } from 'react';

import UserInput from './components/UserInput';
import Calendar from './containers/Calendar';
import StockEntry from './components/StockEntry';
import stocksTimingFilter from 'stocksTimingFilter';
import performStockLookup from 'performStockLookup';

class App extends Component {
  state = {
    displayList: [],
    stocks: [],
    selectedDay: null,
    errorMessage: null,
    lastEnteredValue: '',
    loading: true,
  }

  async componentDidMount() {
    const stocks = await performStockLookup(document.querySelector('#ticketsInput').value);
    this.setState({ stocks, loading: false });
  }

  onDaySelected(day = this.state.selectedDay) {
    if (this.state.stocks && this.state.stocks.length && day) {
      const displayList = stocksTimingFilter(this.state.stocks, day.selected, 'day');
      this.setState({ displayList, selectedDay: day });
    }
  }

  async onTickerSubmit() {
    this.setState({ loading: true });
    const userEnteredValue = document.querySelector('#ticketsInput').value;
    if (userEnteredValue === this.state.lastEnteredValue) return;

    const stocks = await performStockLookup(userEnteredValue);
    if (stocks.error) {
      this.setState({ errorMessage: stocks.message, loading: false })
      return;
    }
    
    this.setState({
      stocks, error: false,
      errorMessage: null,
      lastEnteredValue: userEnteredValue,
      loading: false,
    });
    this.onDaySelected();
  }

  render() {
    return (
      <>
        <UserInput
          loading={this.state.loading}
          onTickerSubmit={this.onTickerSubmit.bind(this)}
          errorMessage={this.state.errorMessage}
        />
        <Calendar
          stocks={this.state.stocks}
          daySelectionMade={this.onDaySelected.bind(this)}
        />
        {this.state.displayList &&
          this.state.displayList.map(visibleStocks => <StockEntry key={visibleStocks.symbol} {...visibleStocks} />)
        }
      </>
    );
  }
}

export default App;
