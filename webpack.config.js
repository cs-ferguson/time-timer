const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/timer.js",
  plugins: [
    new HtmlWebpackPlugin({
      title: "Time Timer",
      template: "src/index.ejs",
    }),
  ],
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
};
