require('dotenv').config();
const env = process.env.AUTH_ENV;

var request = require('request');

var getStatusOptions = {
  url: 'https://api.candyhouse.co/public/sesame/fc5bad76-b2f0-4876-b4ea-17e3bc93fd05',
  headers: {
    'Authorization': env,
  }
};

//鍵を閉める時のリクエスト情報
var postLockOptions = {
  url: 'https://api.candyhouse.co/public/sesame/fc5bad76-b2f0-4876-b4ea-17e3bc93fd05',
  headers: {
    'Authorization': env,
    'content-type': 'application/json'
  },
  body: JSON.stringify({
    "command":"lock"
  })
};

//鍵を開ける時のリクエスト情報
var postUnlockOptions = {
  url: 'https://api.candyhouse.co/public/sesame/fc5bad76-b2f0-4876-b4ea-17e3bc93fd05',
  headers: {
    'Authorization': env,
    'content-type': 'application/json'
  },
  body: JSON.stringify({
    "command":"unlock"
  })
};

function callback(error, response, body) {
  var info = JSON.parse(body);
  if (!error && response.statusCode == 200) {
    console.log("success");
    console.log(info);
  } else {console.log(info.message)}
}

var sesameStatus = request.get(getStatusOptions, callback);

// if (sesamiStatus.locked && )
request.get(getStatusOptions, callback);
