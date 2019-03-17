if (process.env.NODE_ENV === 'production') {
  const PROD = require('./prod');
  module.exports = PROD;
} else {
  const DEV = require('./dev');
  module.exports = DEV;
}
