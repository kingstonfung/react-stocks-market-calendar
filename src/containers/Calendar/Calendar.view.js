/*
  This is the core component to our Application. It is composed of many child (and sub children) components
  in order to drive the view of the entire calendar.

  As the App initializes, we immediately want to set the currnet date (today) and store it in the state.

  The two props this component will receive from the root level "App" are:
    a) daySelectionMade (function): As soon as the user clicks on any day, we want to trigger this function
      to allow the App to determine if the selected day contains any companies that have earnings call.
    b) stocks (array): This list is passed down from the root level (App), and we relay it deeper into the
      child compponent (Week), which eventually be passed down to the Day component that renders the stock
      ticker symbol.
*/

import React from 'react';
import moment from 'moment';

import Header from './Header';
import Week from './Week';
import generateWeeks from 'utils/generateWeeks';
import stocksTimingFilter from 'utils/stocksTimingFilter';

import styles from './Calendar.module.scss';

class Calendar extends React.Component {
  state = {
    month: moment(),
    selected: moment().startOf('day'),
  };

  changeMonth(selectedDate) {
    this.setState({ ...selectedDate });
    this.props.daySelectionMade(selectedDate);
  }

  render() {
    const weeks = generateWeeks(this.state.month, this.state.selected, this.changeMonth.bind(this));
    const onMonthChangeTriggered = month => this.setState({ month });

    return (
      <section className={styles.calendar}>
        <Header month={this.state.month} triggerMonthChange={onMonthChangeTriggered} />
        { weeks.map((weekInfo) => {
          if (this.props.stocks.length) {
            weekInfo.stocks = stocksTimingFilter(this.props.stocks, weekInfo.date, 'week')
          }
          return <Week {...weekInfo} key={weekInfo.date} />;
        }) }
      </section>
    );
  }
}

export default Calendar;
