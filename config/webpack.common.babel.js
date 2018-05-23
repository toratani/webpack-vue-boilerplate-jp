import fs from 'fs';
import path from 'path';
import glob from 'glob';

// パス
const basePath = path.resolve(__dirname, '../');

// プラグイン
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackNotifierPlugin from 'webpack-notifier';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import SpritesmithPlugin from 'webpack-spritesmith';
import SVGSpritemapPlugin from 'svg-spritemap-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';

// 設定
const config = {
  context: path.resolve(basePath, 'src'),
  entry: path.resolve(basePath, 'src/entry.js'),
  output: {
    path: path.resolve(basePath, 'dist'),
    filename: 'js/bundle.js',
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'src': path.resolve(basePath, 'src')
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader'],
        }),
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                url: false
              }
            },
            'postcss-loader',
            'sass-loader',
            'import-glob-loader'
          ],
        }),
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'eslint-loader',
      },
      {
        test: /\.vue$/,
        exclude: /(node_modules)/,
        loader: 'vue-loader',
      }
    ],
  },
  plugins: [
    // dist初期化
    new CleanWebpackPlugin(['dist'], {
      root: basePath,
      verbose: true,
      dry: false,
    }),
    // CSS出力
    new ExtractTextPlugin({
      filename: 'css/style.css'
    }),
    // 画像コピー
    new CopyWebpackPlugin([{
      from: 'img/**/*.+(jpg|jpeg|png|gif|svg)',
      to: './',
    }]),
    // CSSスプライト
    new SpritesmithPlugin({
      src: {
        cwd: path.resolve(basePath, 'src/img/'),
        glob: '**/*.png'
      },
      target: {
        image: './dist/img/sprite.png',
        css: './tmp/_sprite.scss'
      },
      apiOptions: {
        cssImageRef: '../img/sprite.png'
      }
    }),
    // SVGスプライト
    new SVGSpritemapPlugin({
      src: './src/svg/**/*.svg',
      filename: 'img/spritemap.svg'
    }),
    // 通知
    new WebpackNotifierPlugin(),
    // Stylelint
    new StyleLintPlugin({
      configFile: '.stylelintrc',
      files: 'src/scss/**/*.scss',
      fix: true
    }),
    // 進捗
    new ProgressBarPlugin(),
    // マニフェスト挿入
    new ManifestPlugin({
      seed: JSON.parse(fs.readFileSync(path.resolve(basePath, 'src', 'manifest.json'), 'utf-8'))
    }),
  ],
};

// HTML
const entryHtmlPaths = glob.sync('src/html/*.html');
entryHtmlPaths.forEach((htmlFilePath) => {
  config.plugins.push(new HtmlWebpackPlugin({
    template: htmlFilePath.replace(/^src\//, ''),
    filename: path.resolve(basePath, 'dist', path.basename(htmlFilePath)),
    hash: true
  }));
});

// エクスポート
export default config;
