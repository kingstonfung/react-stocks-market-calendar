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
