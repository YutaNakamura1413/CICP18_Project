const express = require('express')
const app = express()
const portNo = 3000
const fs = require("fs");
const Web3 = require('web3');
require('dotenv').config();
const env = process.env.AUTH_KEY;
const request = require('request');
const bodyParser = require('body-parser')

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// web3の初期化
web3 = new Web3();
// プライベートネットワークと接続
if (!web3.currentProvider) {
  web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));
}

//simplestorageのABI
var contract = require('../build/contracts/KeyContract.json');
var ABI = contract.abi;
var address = contract.networks[13].address;
var smartKey = web3.eth.contract(ABI).at(address);
var status
var event = smartKey.OpenClose();

//イベント監視
event.watch(function (error, result) {
 console.log('watching "OpenClose" event!');
  if (!error)
    console.log(result);
});

app.get('/', (req, res, next) => {
  res.render("index")
})

app.post('/open', (req, res, next) => {
  let address = req.body["user_account"]
    if (typeof address !== 'undefined') {
      smartKey.open({from:address});
    }
})

app.post('/close', (req, res, next) => {
  let address = req.body["user_account"]
    if (typeof address !== 'undefined') {
      smartKey.close({from:address});
    }
})
app.listen(portNo, () => {
  console.log('起動しました', `http://localhost:${portNo}`)
})
