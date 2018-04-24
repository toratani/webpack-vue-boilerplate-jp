import webpackMerge from 'webpack-merge';
import commonConfig from './webpack.common.babel.js';

// プラグイン
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';
import browserSyncConfig from './bs-config.js';

// 設定
const config = webpackMerge(commonConfig, {
  devtool: 'inline-source-map', // ソースマップ
  plugins: [
    // ローカルサーバ Browsersync
    new BrowserSyncPlugin(browserSyncConfig),
  ]
});

// エクスポート
export default config;
