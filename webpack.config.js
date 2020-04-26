// Module nodeJS facilitant l'accès aux path
const path = require('path');
// Plugin HTML 
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // notre fichier principal, notre point d'entré
    entry: {
        main: path.join(__dirname, "src/index.js")
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js/,
                exclude: /(node_modules)/,
                use: ["babel-loader"]
            },
            {
                test: /\.css$/i, // tous les fihiers css insensible à la casse
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "./src/index.html")
        })
    ],
    stats: "minimal",
    devtool: "source-map",
    mode: "development",
    devServer: {
        open: false,
        contentBase: "./dist",
        inline: true,
        port: 4000
    }
}