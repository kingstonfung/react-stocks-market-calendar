/*
  This "stateless" component is the view that shows the individual stock information when the day
  of earnings call is selected.
*/

import React from 'react';
import moment from 'moment';

import formatCurrency from 'utils/formatCurrency';
import styles from './StockEntry.module.scss';

export default (props) => (
  <div className={styles.stockEntry}>
    <span className={styles.symbol}>
      {props.symbol}
    </span>
    <span className={styles.name}>
      {props.name}
    </span>
    <span className={styles.price}>
      ${formatCurrency(props.price)}
    </span>
    <div className={styles.earningsCallDateWrapper}>
      <span>Earnings call on:</span>
      <span className={styles.earningsCallDate}>
        {moment(props.earningsDate).format('YYYY-MM-DD h:mma')}
      </span>
    </div>
  </div>
);
