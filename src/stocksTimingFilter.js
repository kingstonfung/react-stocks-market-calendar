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
