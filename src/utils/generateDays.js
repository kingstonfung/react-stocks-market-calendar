export default (date, month) => {
  let days = [];
  for (let i = 0; i < 7; i++) {
    let day = {
      date,
      name: date.format('dd').substring(0, 1),
      number: date.date(),
      isCurrentMonth: date.month() === month.month(),
      isToday: date.isSame(new Date(), 'day'),
      uniqueKey: date.format(),
    };

    days.push(day);
    date = date.clone();
    date.add(1, 'day');
  }

  return days;
};