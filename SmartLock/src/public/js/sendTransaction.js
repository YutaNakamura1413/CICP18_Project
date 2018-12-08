window.addEventListener('load', function () {
    if (typeof web3 !== 'undefined') {
        console.log('Web3：' + web3.currentProvider.constructor.name);
        startApp();
        switchImage();
    }else{
        console.log('MetaMaskをインストールして下さい');
    }
})

function startApp(){
    web3 = new Web3(web3.currentProvider);
    web3.eth.getAccounts(function(error, accounts) {
        if (error) return;
        let user_address = accounts[0];
        if(typeof user_address !== 'undefined'){
          window.sessionStorage.setItem(['user_address'],[user_address]);
        }else{
            console.log("ログインして下さい");
        }
    });
}

function switchImage(){
  var status = document.getElementById('status').innerHTML
  console.log(status);
  var elem = document.getElementById("image");
  switch (status) {
        case "true":
          elem.src = "images/closeKey.jpg";
          break;
        case "false":
          elem.src = "images/openKey.jpg";
          break;
      }
}

function sendTransaction(button) {
  button.disabled = true;
  setTimeout(function() {
    button.disabled = false;
  }, 5000);
  var ABI = [ { inputs: [],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'constructor' },
              { anonymous: false,
                inputs: [ [Object], [Object] ],
                name: 'OpenClose',
                type: 'event' },
              { constant: false,
                inputs: [],
                name: 'getStatus',
                outputs: [ [Object] ],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function' },
              { constant: false,
                inputs: [],
                name: 'open',
                outputs: [ [Object] ],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function' },
              { constant: false,
                inputs: [],
                name: 'close',
                outputs: [ [Object] ],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function' },
              { constant: false,
                inputs: [ [Object] ],
                name: 'grantRight',
                outputs: [],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function' } ];
  var address = "0x06715a57e047d3ecebcd490c74799d95353af279";
  var smartKey = web3.eth.contract(ABI).at(address);
  var user_address = window.sessionStorage.getItem(['user_address']);
  var event = smartKey.OpenClose();

  //イベント監視
  event.watch(function (error, result) {
   console.log('watching "OpenClose" event!');
    if (!error)
      console.log(result);
  });
  // 要素を追加
  if(button.value === 'Open') {
    smartKey.open({from:user_address}, (error, result) => {
      console.log(result);
      var status = document.getElementById('status')
      status.innerHTML = 'false'
      switchImage();
    });
  } else {
    smartKey.close({from:user_address}, (error, result) => {
      console.log(result);
      var status = document.getElementById('status')
      status.innerHTML = 'true'
      switchImage();
    });
  }
}
