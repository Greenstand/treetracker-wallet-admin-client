export default class TransferFilter {
  // possible query options
  status;
  wallet;
  before;
  after;

  constructor(options) {
    // assign options properties to created instance
    Object.assign(this, options);
  }

  // where object contains the query options
  getWhereObj = () => {
    let where = {};

    if (this.status) where.status = this.status;
    if (this.wallet) where.wallet = this.wallet;
    if (this.before) where.before = this.before;
    if (this.after) where.after = this.after;

    return where;
  };
}