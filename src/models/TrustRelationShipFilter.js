

export default class TrustRelationshipsFilter {
    // possible query options
    state;
    type;
    requestType;
  
    constructor(options) {
      // assign options properties to created instance
      Object.assign(this, options);
    }
  
    // where object contains the query options
    getWhereObj() {
      let where = {};
  
      if (this.state) where.state = this.state.toLowerCase();
      if (this.type) where.type = this.type.toLowerCase();
      if (this.requestType) where.requestType = this.requestType.toLowerCase();
  
      return where;
    }
  }