import React from 'react';

import DayNames from '../DayNames';
import ArrowButton from './ArrowButton';
import MonthLabel from './MonthLabel';

import styles from './Header.module.scss';

class Header extends React.Component {
  state = { month: this.props.month };

  previous() {
    const { month } = this.state;

    this.setState({
      month: month.subtract(1, 'month'),
    });

    this.props.triggerMonthChange(month);
  }

  next() {
    const { month } = this.state;

    this.setState({
      month: month.add(1,'month'),
    });

    this.props.triggerMonthChange(month);
  }

  render() {
    return (
      <header className={styles.header}>
        <div className={styles.monthDisplay}>
          <ArrowButton clickHandler={this.previous.bind(this)} />
          <MonthLabel month={this.state.month} />
          <ArrowButton clickHandler={this.next.bind(this)} isRightArrow />
        </div>
        <DayNames />
      </header>
    )
  }
}

export default Header;
