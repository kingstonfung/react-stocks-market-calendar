/*
  This simple component is housed within the "Day" component, that displays a little icon
  with the stock ticker, to indicate the company that is having earnings call on that day.
*/

import React from 'react';

import styles from './Symbol.module.scss';

export default ({ symbol }) => (
  <span key={symbol} className={styles.symbol}>{symbol}</span>
);
