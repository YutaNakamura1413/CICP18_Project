// 必要なパッケージをインポート
const fs = require("fs");
const Web3 = require('web3');

// web3の初期化
web3 = new Web3();
// プライベートネットワークと接続
if (!web3.currentProvider) {
    web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));
}

// ボタンを押した時の処理
function OnButtonClick() {

    target = document.getElementById("output");
    target.innerHTML = "鍵が空きました";
}
//simplestorageのABI
var contract = require('../../build/contracts/KeyContract.json');
var ABI = contract.abi;
// console.log(ABI);

//デプロイしたアドレス
var address = contract.networks[13].address;
// console.log(address);
//
var smartKey = web3.eth.contract(ABI).at(address);
// console.log(smartKey);

smartKey.close({from:web3.eth.accounts[0]});
