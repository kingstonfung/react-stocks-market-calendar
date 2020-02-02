/*
  This "Day" component is responsible to render the square box with the date number, as well
  as any stock symbols "./Symbol/Symbol.view.js" that have earning calls on that day.

  Additionally, the "generateClassName" function here would help us create a list of
  css class name to be appended to this component's <span> element. At the end, the combined
  styling will let the user know if they have:
    a) Selected this component
    b) If this component represents today
    c) If this component falls within the current month
*/

import React from 'react';

import Symbol from './Symbol';
import styles from './Day.module.scss';

export default (props) => {
  const { day, select, selected } = props;

  const generateClassName = () => {
    const list = [styles.day];

    if (day.date.isSame(selected)) list.push(styles.selected);

    if (day.isToday) list.push(styles.today);
    
    if (!day.isCurrentMonth) list.push(styles.differentMonth);

    return list.join(' ');
  }

  const renderTickerSymbol = (stocks) => {
    return (
      <div className={styles.symbolsWrapper}>
        {stocks.map(stock => <Symbol key={stock.symbol} symbol={stock.symbol} />)}
      </div>
    );
  }

  return (
    <span 
      key={day.date.toString()} 
      className={generateClassName()}
      onClick={() => select(day)}
    >
      {props.stocks && props.stocks.length ? renderTickerSymbol(props.stocks) : null}
      {day.number}
    </span>
  );
}
