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

// get the key status
// const getStatusOptions = {
//   url: url,
//   headers: {
//     'Authorization': env
//   }
// };

//鍵を閉める時のリクエスト情報
const postLockOptions = {
  url: "https://51b0fb00.ngrok.io/close",
  method: 'POST',
};

//鍵を開ける時のリクエスト情報
const postUnlockOptions = {
  url: "https://51b0fb00.ngrok.io/open",
  method: 'POST',
};

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
  console.log(req.body["user_account"])
    //smartKey.open({from:web3.eth.accounts[0]});
})

app.post('/close', (req, res, next) => {
  if (status == false) {
    request(postLockOptions, (error, response, body) => {
      // let json = JSON.parse(body);
      // if (json == "closed") {
    smartKey.close({from:web3.eth.accounts[0]});
      // }
    });
  }
})

app.listen(portNo, () => {
  console.log('起動しました', `http://localhost:${portNo}`)
})
