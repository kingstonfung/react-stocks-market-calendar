/*
  This component is responsible for the view of the input textfield and "Search" button.
  
  Notice the "defaultValue" here, because we have statically set the default stocks for this App,
  we want to reflect that by assigning the default value here as well to indicate to the user
  that this is what we have shown on first load.

  Also take note of the onClick hander, we ONLY want to trigger the event (props.onTickerSubmit)
  when it is not loading which is obtained from props, sent from the parent.
*/

import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

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
      className={[styles.searchButton, props.loading ? styles.loading : null].join(' ')}
      variant="contained"
      color="primary"
      onClick={() => {
        if (!props.loading) props.onTickerSubmit();
      }}
    >
      {
        props.loading
        ? <FontAwesomeIcon icon={faSpinner} size="lg" spin />
        : 'Search'
      }      
    </Button>
  </div>
);
