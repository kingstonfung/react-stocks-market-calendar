import React from 'react';
import moment from 'moment';

import Header from '../components/Header';
import Week from '../components/Week';
import stocksTimingFilter from '../stocksTimingFilter';

import styles from './Calendar.module.scss';

const generateWeeks = (month, selected, changeMonth) => {
  let weeks = [];
  let done = false;
  let date = month.clone().startOf('month').add('w' -1).day('Sunday');
  let count = 0;
  let monthIndex = date.month();

  while (!done) {
    weeks.push({
      date: date.clone(),
      month,
      select: day => changeMonth({ selected: day.date, month: day.date.clone() }),
      selected,
      stocks: [],
    });

    date.add(1, 'w');
    done = count++ > 2 && monthIndex !== date.month();
    monthIndex = date.month();
  }

  return weeks;
};

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
