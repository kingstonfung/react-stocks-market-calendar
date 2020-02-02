/*
  This simple component is responsible for displaying the month and year text
  at the top of the calendar. For example: "February 2020".
*/

import React from 'react';

import styles from './MonthLabel.module.scss';

export default ({ month }) => (
  <span className={styles.monthLabel}>{month.format("MMMM YYYY")}</span>
);
