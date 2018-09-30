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

callApi(getStatusOptions).then((status) => {
  if(status.locked == true) {
    return callApi(postUnlockOptions);
  }
}).then((res) => {
  return callApi({
    url: `https://api.candyhouse.co/public/action-result?task_id=${res.task_id}`,
    headers: {
      'Authorization': env
    }
  });
}).then((res) => {
  console.log(res.status);
});
