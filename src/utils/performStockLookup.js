export default async (userEnteredValue) => {
  const urlQueryString = `?symbol=${userEnteredValue.replace(/\s/ig, '')}`;
  const url = `https://fzlgkbplvj.execute-api.us-west-2.amazonaws.com/earnings-date${urlQueryString}`;
  const response = await fetch(url);
  const stocks = await response.json();
  return stocks;
}
