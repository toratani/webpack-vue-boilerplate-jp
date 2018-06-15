import historyApiFallback from 'connect-history-api-fallback';

export default {
  files: './dist',
  // ローカル開発用
  port: 8082,
  open: false,
  // 他端末検証用
  // port: 3000,
  // open: 'external',
  notify: false,
  reloadDelay: 1000,
  server: {
    baseDir: './dist',
    index: 'index.html',
    middleware: [historyApiFallback()]
  }
};
