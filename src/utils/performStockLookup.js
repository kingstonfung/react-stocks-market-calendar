/*
  This asynchronous function is a helper utility that performs the stock symbol lookup, wait for data,
  and then returns the information back to the consumer (used in App.js).

  Read more about async/await here:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
*/

export default async (userEnteredValue) => {
  const urlQueryString = `?symbol=${userEnteredValue.replace(/\s/ig, '')}`;
  const url = `https://fzlgkbplvj.execute-api.us-west-2.amazonaws.com/earnings-date${urlQueryString}`;
  const response = await fetch(url);
  const stocks = await response.json();
  return stocks;
}
