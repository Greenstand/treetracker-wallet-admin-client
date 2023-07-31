import { getDateText } from '../utils/formatting';

export default class TransferFilter {
  // possible query options
  state;
  wallet;
  before;
  after;

  constructor(options) {
    // assign options properties to created instance
    Object.assign(this, options);
  }

  // where object contains the query options
  getWhereObj() {
    let where = {};

    if (this.state) where.state = this.state.toLowerCase();
    if (this.wallet) where.wallet = this.wallet;
    if (this.before) where.before = getDateText(this.before, 'YYYY-MM-DD');
    if (this.after) where.after = getDateText(this.after, 'YYYY-MM-DD');

    return where;
  }
}