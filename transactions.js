const sha256 = require('crypto-js/sha256');
module.exports = class {
  constructor(index, transactions, timestamp) {
    this.index = index;
    this.transactions = transactions;
    this.timestamp = timestamp;
    this.nonce = 0;
    this.preHash = "";
    this.hash = this.caculate();
  }
  caculate() {
    return sha256(this.index + JSON.stringify(this.data) + this.timestamp + this.preHash + this.nonce).toString();
  }

  mineBlock(difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }
}