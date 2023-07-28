import dayjs from 'dayjs';

/**Formats a number with commas based on the locale
 * @param {number} number Number to be formatted
 * @return {string} number with commas  */
export const formatWithCommas = (number) => Intl.NumberFormat(process.env.USER_LOCALE).format(number);

/**Converts a date object into a string with format mm/dd/yyyy
 * @param {Object} date Dayjs date object
 * @return {string} string with format mm/dd/yyyy
 */
export const getDateText = (date) => dayjs(date).format('MM/DD/YYYY');