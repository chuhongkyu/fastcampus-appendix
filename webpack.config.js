const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");

const webpackMode = process.env.NODE_ENV || 'development';

module.exports = {
  mode: webpackMode,
  entry: './src/index.js', // 프로젝트 진입점 파일
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), // 빌드된 파일의 출력 디렉토리
  },
  devServer: {
    port: 8080, // 개발 서버 포트
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // HTML 템플릿 파일 경로
      filename: 'index.html', // 생성될 HTML 파일 이름
    }),
    new CopyWebpackPlugin({
			patterns: [
				{ from: "./src/assets", to: "./assets" },
        { from: "./src/example01", to: "./example01" },
        { from: "./src/example02", to: "./example02" },
        { from: "./src/example03", to: "./example03" },
        { from: "./src/example04", to: "./example04" },
        // { from: "./src/example05", to: "./example05" },
			],
		})
  ],
};
