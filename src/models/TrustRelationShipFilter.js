import { getDateText } from "../utils/formatting";

export default class TrustRelationshipsFilter {
    // possible query options
    state;
    type;
    request_type;
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
      if (this.type) where.type = this.type.toLowerCase();
      if (this.request_type) where.request_type = this.request_type.toLowerCase();
      if (this.before) where.before = getDateText(this.before, 'YYYY-MM-DD');
      if (this.after) where.after = getDateText(this.after, 'YYYY-MM-DD');
  
      return where;
    }
  }