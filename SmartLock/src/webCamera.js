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
app.use(express.static('public'));

// // web3の初期化
// web3 = new Web3();
// // プライベートネットワークと接続
// if (!web3.currentProvider) {
//   web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));
// }

// //simplestorageのABI
// var contract = require('../build/contracts/KeyContract.json');
// var ABI = contract.abi;
// var address = contract.networks[13].address;
// var smartKey = web3.eth.contract(ABI).at(address);
// var event = smartKey.OpenClose();

// //イベント監視
// event.watch(function (error, result) {
//  console.log('watching "OpenClose" event!');
//   if (!error)
//     console.log(result);
// });

app.get('/', (req, res, next) => {
//   var status = smartKey.getStatus.call({from:web3.eth.accounts[0]});
  res.render("webcamera")
})

app.post('/open', (req, res, next) => {
})

app.post('/close', (req, res, next) => {
})

app.listen(portNo, () => {
  console.log('起動しました', `http://localhost:${portNo}`)
})
