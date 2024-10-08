import * as path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

const devConfig = {
	mode: "development",
	entry: "./src/index.tsx",
	devtool: "inline-source-map",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "./bundle.js",
		clean: true,
	},
	devServer: {
		port: 3030,
	},
	module: {
		rules: [
			{
				test: /\.(js|ts)x?$/,
				loader: "babel-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: ["style-loader", "css-loader", "sass-loader"],
			},
			{
				test: /\.(png|woff|woff2|eot|ttf|svg)$/,
				loader: "url-loader",
				options: { limit: false },
			},
		],
	},
	resolve: { extensions: [".tsx", ".ts", ".js"] },
	plugins: [
		new HtmlWebpackPlugin({
			template: "./public/index.html",
		}),
	],
};

const prodConfig = {
	mode: "production",
	entry: "./src/index.tsx",
	output: {
		path: path.resolve("D:\\ezequ\\Projects\\HoopTesting_System\\HoopTesting_DatabaseManager", "dist"),
		filename: "bundle.js",
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.(js|ts)x?$/,
				loader: "babel-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: ["style-loader", "css-loader", "sass-loader"],
			},
			{
				test: /\.(png|woff|woff2|eot|ttf|svg)$/,
				loader: "url-loader",
				options: { limit: false },
			},
		],
	},
	resolve: { extensions: [".tsx", ".ts", ".js"] },
	plugins: [
		new HtmlWebpackPlugin({
			template: "./public/index.html",
		}),
	],
};

module.exports = [ devConfig, prodConfig ];
