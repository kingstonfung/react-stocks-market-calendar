import React from 'react';
import moment from 'moment';

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