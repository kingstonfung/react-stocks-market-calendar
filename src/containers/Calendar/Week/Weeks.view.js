/*
  This component is responsible for the rendering of each row of weeks. Inside each row,
  we also render individual days (Days.view.js) to form the calendar.

  This component receives a handful of props from its parent (Calendar.view.js):
    a) date: An instance of the 'Monent' date class with the week's information we
      need to generate each day.
    b) month: Also an instance of the Moment date class, representing the month this
      week represents.
    c) selected: Also an instance of the Moment date class, representing the selected
      date, and we will pass this information down to the Day component.
    d) select: Event handler that we relay from the parent (Calendar) to the child (Day).
      We don't do much with the "select" method, rather just relaying the function
      reference from parent to child.
    e) stocks: A list (array) of stocks fetched from the App, and we pass this list down
      for each day to process and render.
*/

import React from 'react';

import Day from '../Day';
import generateDays from 'utils/generateDays';
import stocksTimingFilter from 'utils/stocksTimingFilter';

import styles from './Week.module.scss';

export default (props) => {
  const { date, month, selected, select, stocks } = props;
  const days = generateDays(date, month);

  return (
    <div className={styles.week}>
      {
        days.map((day) => {
          let earningCallsForTheDay;
          if (stocks.length) {
            earningCallsForTheDay = stocksTimingFilter(stocks, day.date, 'day');
          }

          return <Day key={day.uniqueKey} day={day} selected={selected} select={select} stocks={earningCallsForTheDay} />;
        })
      }
    </div>
  );
}