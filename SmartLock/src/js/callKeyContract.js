// 必要なパッケージをインポート
const fs = require("fs");
const Web3 = require('web3');

require('dotenv').config();
const env = process.env.AUTH_KEY;
const request = require('request');
const url = 'https://api.candyhouse.co/public/sesame/fc5bad76-b2f0-4876-b4ea-17e3bc93fd05';

// get the key status
const getStatusOptions = {
  url: url,
  headers: {
    'Authorization': env
  }
};

//鍵を閉める時のリクエスト情報
const postLockOptions = {
  url: url,
  method: 'POST',
  headers: {
    'Authorization': env,
    'content-type': 'application/json'
  },
  body: JSON.stringify({
    "command": "lock"
  })
};

//鍵を開ける時のリクエスト情報
const postUnlockOptions = {
  url: url,
  method: 'POST',
  headers: {
    'Authorization': env,
    'content-type': 'application/json'
  },
  body: JSON.stringify({
    "command": "unlock"
  })
};

const callApi = (options) => {
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      let json = JSON.parse(body);
      if (!error && response.statusCode == 200) {
        resolve(json);
      } else {
        reject(json.message);
      }
    });
  });
}

const callApiResult = (options) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      request(options, (error, response, body) => {
        let json = JSON.parse(body);
        if (!error && response.statusCode == 200) {
          resolve(json);
        } else {
          reject(json.message);
        }
      });
    }, 10000);
  });
}

// web3の初期化
web3 = new Web3();
// プライベートネットワークと接続
if (!web3.currentProvider) {
  web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));
}

//simplestorageのABI
var contract = require('../../build/contracts/KeyContract.json');
var ABI = contract.abi;
var address = contract.networks[13].address;
var smartKey = web3.eth.contract(ABI).at(address);
var status = smartKey.getStatus.call({from:web3.eth.accounts[0]});

callApi(getStatusOptions).then((res) => {
  if(res.locked == true && status == true) {
    console.log('status OK');
    return callApi(postUnlockOptions);
  }
}).then((res) => {
  console.log(res);
  return callApiResult({
    url: `https://api.candyhouse.co/public/action-result?task_id=${res.task_id}`,
    headers: {
      'Authorization': env
    }
  });
}).then((res) => {
  console.log(res);
  if(res.successful == true) {
    console.log(res.successful);
    smartKey.open({from:web3.eth.accounts[0]});
  }
});
