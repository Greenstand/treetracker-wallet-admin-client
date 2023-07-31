import dayjs from 'dayjs';

/**Formats a number with commas based on the locale
 * @param {number} number Number to be formatted
 * @return {string} number with commas  */
export const formatWithCommas = (number) => Intl.NumberFormat(process.env.USER_LOCALE).format(number);

/**Converts a date object into a string with format (eg. mm/dd/yyyy)
 * @param {Object} date Dayjs date object, ISO date, etc.
 * @param {string} dateFormat Date format
 * @return {string} string with format
 */
export const getDateText = (date, dateFormat) => {
  return dayjs(date).format(dateFormat);
};

/**Converts a filter object into a query string to be appended to the query URL
 * eg. filterObj = {limit: 10, offset: 20} returns 'limit=10&offset=20'
 * @param {Object} filterObj filter object of query parameters
 * @return {string} query parameter string
 */
export const makeQueryString = (filterObj) => {
  let arr = [];
  for (const key in filterObj) {
    if (filterObj[key] !== null && filterObj[key] !== '')
      arr.push(`${key}=${filterObj[key]}`);
  }
  return arr.join('&');
};