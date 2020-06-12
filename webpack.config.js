// Module nodeJS facilitant l'accès aux path
const path = require('path');
// Plugin HTML 
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // notre fichier principal, notre point d'entré
    // Creation d'un chunk
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
                // On load tous les fichier js et avec babel on les optimise
                test: /\.js/,
                exclude: /(node_modules)/,
                use: ["babel-loader"]
            },
            {
                // On load tous les fichiers css (i : insensible à la casse)
                test: /\.css$/i,
                // L'ordre des loader est important, on doit d'abord mettre 'style-loader' avant 'css-loader'
                // Sinon nous auront une erreur au moment du run de webpack
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