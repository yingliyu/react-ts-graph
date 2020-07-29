const {
  override,
  fixBabelImports,
  addLessLoader,
  useEslintRc,
  addWebpackAlias,
} = require('customize-cra');

const path = require('path');
function resolve(dir) {
  return path.join(__dirname, '.', dir);
}

const config = override(
  // antd按需加载，不需要每个页面都引入"antd/dist/antd.css"了
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  // 更换主题配置
  addLessLoader({
    lessOptions: {
      // strictMath: true,
      noIeCompat: true,
      modules: true,
      javascriptEnabled: true,
      modifyVars: { '@primary-color': '#f9c700' },
    },
  }),
  // 使用.eslintrc.js
  useEslintRc(),
  // 配置路径别名
  addWebpackAlias({
    '@': resolve('src'),
  }),
);

module.exports = config;
