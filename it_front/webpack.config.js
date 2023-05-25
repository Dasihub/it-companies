const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	mode: 'production',
	entry: ['@babel/polyfill', path.resolve(__dirname, 'src/index.tsx')],
	output: {
		path: path.resolve(__dirname, 'path'),
		filename: 'js/app.js',
		clean: true
	},
	devtool: 'source-map',
	devServer: {
		port: 3000,
		historyApiFallback: true,
		open: true
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.jsx', '.js']
	},
	performance: {
		hints: false
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'public/index.html')
		})
	],
	module: {
		rules: [
			{
				test: /\.(tsx|ts)$/,
				exclude: /node_modules/,
				use: 'ts-loader'
			},
			{
				test: /\.(jsx|js)$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.(less|css)$/,
				use: ['style-loader', 'css-loader', 'less-loader']
			},
			{
				test: /\.(svg|jpg|png)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'assets/[name].[ext]'
						}
					}
				]
			}
		]
	}
}
