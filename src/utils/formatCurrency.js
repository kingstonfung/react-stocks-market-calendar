/*
  This is a utility helper function to format numbers into currency format.
*/

export default (number) => number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
