import fs from 'fs';
import path from 'path';
import md5 from 'md5';
import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import commonConfig from './webpack.common.babel.js';

// パス等
const basePath = path.resolve(__dirname, '../');
const iconHash = md5(Math.random());
const commonManifest = JSON.parse(fs.readFileSync(path.resolve(basePath, 'src/manifest.json'), 'utf-8'));

// プラグイン
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import {default as ImageminWebpackPlugin} from 'imagemin-webpack-plugin';
import HtmlBeautifyPlugin from 'html-beautify-webpack-plugin';
import WebpackOnBuildPlugin from 'on-build-webpack';

// 設定
const config = webpackMerge(commonConfig, {
  plugins: [
    // JS圧縮
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    // 画像最適化
    new ImageminWebpackPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
    }),
    // ファビコン生成
    new FaviconsWebpackPlugin({
      logo: './favicon.png',
      prefix: `img/icons-${iconHash}/`,
      emitStats: false,
      persistentCache: true,
      inject: true,
      background: commonManifest.background_color,
      title: commonManifest.name,
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: false,
        twitter: true,
        yandex: false,
        windows: true
      }
    }),
    // HTML整形
    new HtmlBeautifyPlugin({
      config: {
        html: {
          end_with_newline: true,
          indent_size: 2,
          indent_with_tabs: false,
          indent_inner_html: true,
          preserve_newlines: false,
          unformatted: [],
          extra_liners: []
        }
      },
      replace: [' type="text/javascript"']
    }),
    // ビルド終了後
    new WebpackOnBuildPlugin(() => {
      // manifest.jsonを探し続け、結合
      let timer;
      const fn = () => {
        const path1 = path.resolve(basePath, 'dist/manifest.json');
        const path2 = path.resolve(basePath, `dist/img/icons-${iconHash}/manifest.json`);
        if (
          (fs.existsSync(path1)) &&
          (fs.existsSync(path2))
        ) {
          // path1にまとめて上書き
          const manifestJson = JSON.stringify(Object.assign({},
            (JSON.parse(fs.readFileSync(path2, 'utf-8'))),
            (JSON.parse(fs.readFileSync(path1, 'utf-8')))
          ), undefined, 2);
          fs.writeFileSync(path1, manifestJson, 'utf-8');
          // 終了
          clearInterval(timer);
        }
      };
      timer = setInterval(fn, 1000);
      fn();
    })
  ],
});

// エクスポート
export default config;
