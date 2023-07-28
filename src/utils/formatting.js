/**Formats a number with commas based on the locale
 * @param {number} number Number to be formatted
 * @return {string} number with commas  */
export const formatWithCommas = (number) => Intl.NumberFormat(process.env.USER_LOCALE).format(number);