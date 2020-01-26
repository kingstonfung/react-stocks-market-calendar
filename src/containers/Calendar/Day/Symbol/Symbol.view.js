import React from 'react';

import styles from './Symbol.module.scss';

export default ({ symbol }) => (
  <span key={symbol} className={styles.symbol}>{symbol}</span>
);
