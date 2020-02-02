/*
  Similar to "generateDays.js", this utility function helps creating the weeks information
  so it can let the view (Calendar.view.js) to render each row correctly.
*/

export default (month, selected, changeMonth) => {
  let weeks = [];
  let done = false;
  let date = month.clone().startOf('month').add('w' -1).day('Sunday');
  let count = 0;
  let monthIndex = date.month();

  while (!done) {
    weeks.push({
      date: date.clone(),
      month,
      select: day => changeMonth({ selected: day.date, month: day.date.clone() }),
      selected,
      stocks: [],
    });

    date.add(1, 'w');
    done = count++ > 2 && monthIndex !== date.month();
    monthIndex = date.month();
  }

  return weeks;
};