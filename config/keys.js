const PROD = require('./prod');
const DEV = require('./dev');

if (process.env.NODE_ENV === 'production') {
  module.exports = PROD;
} else {
  module.exports = DEV;
}
