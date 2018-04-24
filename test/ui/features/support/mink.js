const {defineSupportCode} = require('cucumber');
const Mink = require('cucumber-mink');

// 設定
defineSupportCode((cucumber) => {
  const parameters = {
    driver: {
      baseUrl: 'http://localhost:8082',
      logLevel: 'silent',
      desiredCapabilities: {
        browserName: 'chrome',
      },
      port: 4444,
    },
    timeout: 5000,
  };
  Mink.configure(parameters);
  Mink.init(cucumber);
});
