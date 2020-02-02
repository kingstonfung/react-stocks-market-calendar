/*
  This is the root component for the entire application.
*/

import React, { Component } from 'react';

import UserInput from './components/UserInput';
import Calendar from './containers/Calendar';
import StockEntry from './components/StockEntry';
import stocksTimingFilter from 'utils/stocksTimingFilter';
import performStockLookup from 'utils/performStockLookup';

class App extends Component {
  state = {
    displayList: [],
    stocks: [],
    selectedDay: null,
    errorMessage: null,
    lastEnteredValue: '',
    loading: true,
  }

  /*
    componentDidMount is one of the React component lifecycles, that runs when the first "render"
    is executed. Here we can set states, fetch data, and do other work that would alert the
    application's state.
  */
  async componentDidMount() {
    const stocks = await performStockLookup(document.querySelector('#ticketsInput').value);

    /*
      The following line will "pause" the function for 10 seconds before updating
      the application state, it is useful to test our loading state during development.
    */
    // await new Promise(r => setTimeout(() => r(), 10000));

    this.setState({ stocks, loading: false });
  }

  onDaySelected(day = this.state.selectedDay) {
    if (this.state.stocks && this.state.stocks.length && day) {
      const displayList = stocksTimingFilter(this.state.stocks, day.selected, 'day');
      this.setState({ displayList, selectedDay: day });
    }
  }

  /*
    This method is triggered when the user clicks the SEARCH button (see UserInput.view.js) when
    the application state is not loading.

    We will immediately set the "loading" state to true so we can display the loading UI right
    the way. Then, once all the data arrives, we will store the information to the state as well
    as reversing the "loading" state (setting it to false) so the UI is cycled again for the next
    user interaction.
  */
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
