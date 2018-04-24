const {defineStep} = require('cucumber');
const mink = require('cucumber-mink');
const path = require('path');

// エレメント表示まで待つ
defineStep(/^I wait max (\d+) seconds? for "([^"]*)" element$/, (seconds, selector) => (
  mink.driver.client.waitForExist(selector, seconds * 1000)
));

// スクリーンショットを撮り指定ファイル名で保存
defineStep(/^I save a screenshot as "([^"]*)"$/, (fileName) => (
  mink.driver.client.saveScreenshot(path.resolve(__dirname, '../', fileName))
));

// リサイズ
defineStep(/^I resize to (\d+),\s*(\d+)$/, (width, height) => (
  mink.driver.client.windowHandleSize({width, height})
));
