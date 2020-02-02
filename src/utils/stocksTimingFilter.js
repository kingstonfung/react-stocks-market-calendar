/*
  This helper function receives the list of stocks fetched within the app, alongside the day the user has selected.
  Then it filters out the stocks within the day and returns them in an array.
*/

import moment from 'moment';

export default (stocks, day, filterType) => {
  const filtered = stocks.filter((stock) => {
    const earningsDate = moment(stock.earningsDate).format('YYYY-MM-DD');
    const renderingDate = day.format('YYYY-MM-DD');
    const sameDay = moment(renderingDate).isSame(earningsDate, filterType);
    if (sameDay) return stock;
    return null;
  });

  return filtered;
};
