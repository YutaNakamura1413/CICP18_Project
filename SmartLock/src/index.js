const raspi = require('raspi')
const PwM = requie('raspi-pwm').pwm

raspi.init(function() {
  const pwm = new PwM('GPIO18')
  pwm.write(70)
  while(1)
})
