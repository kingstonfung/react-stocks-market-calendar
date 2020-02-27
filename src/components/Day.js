import React from 'react';

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
        { stocks.map(stock => <span key={stock.symbol} className={styles.symbol}>{stock.symbol}</span>) }
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
