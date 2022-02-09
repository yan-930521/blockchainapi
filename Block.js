const sha256 = require('crypto-js/sha256');
module.exports = class {
  constructor(transactions, timestamp, preHash) {
    this.transactions = transactions;
    this.timestamp = timestamp;
    this.nonce = 0;
    this.preHash = preHash;
    this.hash = this.calculate();
  }
  calculate() {
    return sha256(this.index + JSON.stringify(this.transactions) + this.timestamp + this.preHash + this.nonce).toString();
  }

  mineBlock(difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      this.nonce++;
      this.hash = this.calculate();
    }
  }
}