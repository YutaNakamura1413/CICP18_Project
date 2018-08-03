// 必要なパッケージをインポート
const fs = require("fs");
const Web3 = require('web3');

// web3の初期化
web3 = new Web3();
// プライベートネットワークと接続
if (!web3.currentProvider) {
    web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));
}

//simplestorageのABI
var contract = require('../../build/contracts/KeyContract.json', 'utf8');
var ABI = contract.abi;
// console.log(ABI);
var address = contract.networks[13].address;
// console.log(address);
var smartKey = web3.eth.contract(ABI).at(address);
// console.log(smartKey);
var event = smartKey.OpenClose();
// console.log(event);

//イベント監視
event.watch(function (error, result) {
 console.log('watching "OpenClose" event!');
  if (!error)
    console.log(result);
});
