# Vue.jsボイラープレート

## 概要

Vue.js(HTML/SCSS/ES6)ボイラープレート。
開発環境は MacOS 10.13 で動作確認済み。

## 特徴

2017年現在の標準的な技術を使用しています。

- パッケージ管理: npm
- バンドラ: Webpack 4(Babel)
- ローカルサーバ: Browsersync
- エディタ設定: editorconfig(utf-8/LF/space2)
- コードフォーマッター: Prettier
- HTML: HTML, js-beautify
- JS: ES6(Babel), UglifyJs
- JS Linter: ESLint(eslint-config-google)
- JSフレームワーク: Vue.js
- CSS: PostCSS/Sass(SCSS/autoprefixer)
- CSS Linter: Stylelint(SMACCSS順)
- CSSスプライト: spritesmith
- CSS設計: BEM
- 画像/SVG: Imagemin
- SVGスプライト: svg-spritemap-webpack-plugin(svgo)
- favicon: 自動生成
- UIテスト: Cucumber(cucumber-mink記法)

## ルール

### CSSルール

- BEM
- stylelint-config-standard, stylelint-config-property-sort-order-smacss

### Gitコミットルール

機能追加でコミットする際は、コメントに[AngularJSのプリフィックス](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#type)をつけてください。

## ビルド

### Node.jsバージョン

ビルドするには[Node.js](https://nodejs.org/ja/)をインストールしてください。

- node >= v8.5.0
- npm >= v5.6.0

### 開発

- ターミナルで当プロジェクトフォルダに移動後 `npm run dev` を実行
- `localhost:8082`, `localhost:3000` もしくは `パブリックIP:3000` をブラウザで確認
- `Ctrl+C` で終了

### 本番

- ターミナルで当プロジェクトフォルダに移動後 `npm run prod` を実行
- `/dist` フォルダを該当環境にコピー

## UIテスト

### テストコード

- 標準ステップは[こちら](http://cucumber-mink.js.org/steps/)
- 拡張ステップの定義は `test/ui/features/step_definitions/` 内に webdriver.io を使って書いてください。

### 実行

- ターミナル1で `npm run dev` を実行。ページを開く。（ `Ctrl+C` で終了）
- ターミナル2で `npm run test:ui-serve` を実行。テストサーバを立ち上げる。（ `Ctrl+C` で終了）
- ターミナル3で `npm run test:ui-start` を実行。テスト実行。←基本このコマンドの繰り返し
