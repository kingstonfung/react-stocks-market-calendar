import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import styles from './UserInput.module.scss';

export default (props) => (
  <div className={styles.inputWrapper}>
    <TextField
      id="ticketsInput"
      className={styles.tickerInput}
      label={props.errorMessage || "Enter Ticker Symbols"}
      variant="outlined"
      defaultValue="FB, AAPL, AMZN, NFLX, GOOGL"
      error={!!props.errorMessage}
    />
    <Button
      className={styles.searchButton}
      variant="contained"
      color="primary"
      onClick={props.onTickerSubmit.bind(this)}
    >
      Search
    </Button>
  </div>
);
