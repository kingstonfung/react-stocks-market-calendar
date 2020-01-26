const axios = require('axios');

exports.handler = async (event) => {
  const payload = {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: '',
  };

  try {
    const { symbol } = event.queryStringParameters;
    const count = (symbol.match(/,/g) || []).length;
    
    if (count > 5) {
      throw new Error('Too many symbols');
    }

    const res = await axios.get(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbol}`);
    const { data } = res;    
    const stockResults = data.quoteResponse && data.quoteResponse.result;
    const simplifiedResults = stockResults.map(stock => (
      {
        name: stock.shortName,
        price: stock.regularMarketPrice,
        symbol: stock.symbol,
        earningsDate: new Date(stock.earningsTimestamp * 1000),
      }
    ));

    payload.body = JSON.stringify(simplifiedResults);
  } catch (error) {
    console.log('error', error);
    payload.statusCode = 500;
    payload.body = JSON.stringify({ error: true, message: error.message });
  }

  return payload;
};
