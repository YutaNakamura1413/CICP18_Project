const NfcpyId = require('node-nfcpy-id').default;
const nfc = new NfcpyId({mode: 'non-touchend'}).start();
const express = require('express')
const app = express()
const portNo = 3000
const raspi = require('raspi');
const pwm = require('raspi-pwm');


app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
  res.render("index")
})

app.post('/open', (req, res, next) => {
  led.write(0.07);
})

app.post('/close', (req, res, next) => {
  led.write(0.11);
})

raspi.init(() => {
  led = new pwm.PWM('GPIO18');
  app.listen(portNo, () => {
  console.log('起動しました', `http://192.168.2.4:${portNo}`)
  })
});

nfc.on('touchstart', (card) => {
  console.log('touchstart:', card.id, 'type:', card.type);
  console.log('5秒後に読み込みを再開します');
  setTimeout(() => {
    nfc.start();
    led.write(0.07);
  }, 5000);
});

nfc.on('error', (err) => {
  // standard error output (color is red)
  console.error('\u001b[31m', err, '\u001b[0m');
});
