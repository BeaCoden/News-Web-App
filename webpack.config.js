const path = require("path");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity, // Increases the number of parallel requests at entry
      minSize: 0, // Minimum chunk size in bytes
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // Grabs the folder name of the package
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            // Avoids vendor prefix and better naming for chunks
            return `npm.${packageName.replace("@", "")}`;
          },
          chunks: "all",
        },
      },
    },
  },
  plugins: [
    new BundleAnalyzerPlugin(), // Helps to visualize size of webpack output files with an interactive zoomable treemap.
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Transpile .js and .jsx files
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // Use babel-loader for these files
        },
      },
    ],
  },
};
