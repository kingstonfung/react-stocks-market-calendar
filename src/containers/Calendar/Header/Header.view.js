/*
  This header component have multiple nested childs, as well as functions that are passed
  in as props which then be assigned to the ArrowButton for changing the month.

  This is a "normal" React component which means it is capable of holding its own state,
  as well as providing all available lifecycle hooks.

  The two props we receive here from the parent are:
    a) "month" - So we know which month to start when the App first initializes.
    b) "triggerMonthChange" - This is the function we want to trigger as soon as the
      triggers a month change, so the App can handle this event and relay the necessary
      information to all related components from the top level.

  In addition to triggering the passed-down props function (triggerMonthChange), we also
  want to hold some information here (month) within the state. As the month changes, we
  will then update the state here, and then pass this information down as props to the
  child components "MonthLabel". By doing so, we can tell the label to update itself with
  a set of new text. (eg: transitioning from "FEBRUARY 2020" to "MARCH 2020").
*/

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
      month: month.add(1, 'month'),
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
