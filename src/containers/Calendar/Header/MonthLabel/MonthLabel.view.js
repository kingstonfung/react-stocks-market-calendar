import React from 'react';

import styles from './MonthLabel.module.scss';

export default ({ month }) => (
  <span className={styles.monthLabel}>{month.format("MMMM YYYY")}</span>
);
