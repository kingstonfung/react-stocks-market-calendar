import React from 'react';

import Day from './Day';
import stocksTimingFilter from '../stocksTimingFilter';

import styles from './Week.module.scss';

const generateDays = (date, month) => {
  let days = [];
  for (let i = 0; i < 7; i++) {
    let day = {
      date,
      name: date.format('dd').substring(0, 1),
      number: date.date(),
      isCurrentMonth: date.month() === month.month(),
      isToday: date.isSame(new Date(), 'day'),
      uniqueKey: date.format(),
    };

    days.push(day);
    date = date.clone();
    date.add(1, 'day');
  }

  return days;
};

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