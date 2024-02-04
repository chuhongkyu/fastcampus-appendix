const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");

const webpackMode = process.env.NODE_ENV || 'development';

const entryAndHtmlConfig = [
  { name: 'example01', htmlTemplate: './src/example01/index.html' },
  { name: 'example02', htmlTemplate: './src/example02/index.html' },
  { name: 'example03', htmlTemplate: './src/example03/index.html' },
  { name: 'example04', htmlTemplate: './src/example04/index.html' },
  { name: 'example05', htmlTemplate: './src/example05/index.html' },
  { name: 'example06', htmlTemplate: './src/example06/index.html' },
];

const pluginHtml = entryAndHtmlConfig.map(config => {
  return (
    new HtmlWebpackPlugin({
      template: config.htmlTemplate,
      filename: `${config.name}.html`,
    })
  )
});

module.exports = {
  mode: webpackMode,
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  devServer: {
    port: 8080,
  },
  plugins: [
    ...pluginHtml, 
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/assets', to: 'assets'},
        { from: './src/css', to: 'css' }
      ]
    })
  ]
};

