export default (number) => number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
