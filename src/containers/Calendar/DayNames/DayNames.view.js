import React from 'react';

import styles from './DayNames.module.scss';

class DayNames extends React.Component {
  render() {
      return (
        <div className={styles.wrapper}>
          <span className={styles.day}>Sun</span>
          <span className={styles.day}>Mon</span>
          <span className={styles.day}>Tue</span>
          <span className={styles.day}>Wed</span>
          <span className={styles.day}>Thu</span>
          <span className={styles.day}>Fri</span>
          <span className={styles.day}>Sat</span>
        </div>
      );
  }
}

export default DayNames;
