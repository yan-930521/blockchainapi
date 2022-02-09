const BlockChain = require('./BlockChain.js');
const Transaction = require('./Transaction.js');
const coin = new BlockChain(2);
console.time("系統時間");

const app = require('express')()
app.listen(process.env.port, () => console.log(`連接至http://localhost:${process.env.port}`));

const usage = `
api 用法：<br>
創建交易 =><br>
/createTransaction/你的名子/給予對象/金額<br>
<br>
挖礦(只會消耗伺服器的算力，演示用) =><br>
/mine/你的名子<br>
<br>
查看現有金額 =><br>
/getbalance/你的名子<br>
`;
app.get('/', (req, res) => {
  res.send(usage);
});

app.get('/createTransaction/:from/:to/:cost', (req, res) => {
  if(coin.getBalance(req.params.from) < Number(req.params.cost) ) {
    res.send("餘額不足");
    return;
  }
  coin.createTransaction(new Transaction(req.params.from, req.params.to, Number(req.params.cost)));
  res.send("交易已送出");
});


app.get('/mine/:name', (req, res) => {
  coin.minePendingTransactions(req.params.name);
  console.log('mine');
  res.send(req.params.name+"的帳戶餘額為: "+coin.getBalance(req.params.name))
  console.log(coin.chain)
});


app.get('/getbalance/:name', (req, res) => {
  res.send(req.params.name+"的帳戶餘額為: "+coin.getBalance(req.params.name));
});