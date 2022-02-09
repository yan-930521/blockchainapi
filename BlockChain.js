const Block = require('./Block.js');
const Transaction = require('./Transaction.js');
module.exports = class {
  constructor(difficulty) {
    this.chain = [
      this.generateGodBlock()
    ]
    this.difficulty = Number(difficulty);
    this.pendingTransactions = [];
    this.miningReward = 10;
  }

  generateGodBlock() {
    return new Block("the God Block", Date.now());
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  createTransaction(transaction) {
    this.pendingTransactions.push(transaction);
  }

  check() {
    for (let i = 1; i < this.chain.length; i++) {
      if (this.chain[i].hash !== this.chain[i].calculate()) {
        return false;
      }
      if (this.chain[i].preHash !== this.chain[i - 1].hash) {
        return false;
      }
    }
    return true;
  }

  minePendingTransactions(Address) {
    let block = new Block(this.pendingTransactions, Date.now(), this.getLatestBlock()['hash']);
    block.mineBlock(this.difficulty);
    this.chain.push(block);
    this.pendingTransactions = [
      new Transaction(null, Address, this.miningReward)
    ];
  }

  getBalance(address) {
    let balance = 0;
    for (const block in this.chain) {
      for (const trans in this.chain[block].transactions) {
        if (this.chain[block].transactions[trans]['FROM'] === address) {
          balance -= this.chain[block].transactions[trans]['Cost'];
        }
        if (this.chain[block].transactions[trans]['TO'] === address) {
          balance += this.chain[block].transactions[trans]['Cost'];
        }
      }
    }
    return balance;
  }
}