import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

import styles from './ArrowButton.module.scss';

export default (props) => (
  <div className={styles.arrowWrapper} onClick={props.clickHandler}>
    <FontAwesomeIcon
      className={styles.arrow}
      icon={faAngleLeft}
      rotation={props.isRightArrow ? 180 : null}
      size="lg"
    />
  </div>
);
