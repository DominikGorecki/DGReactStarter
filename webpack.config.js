const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs'); // to check if the file exists
const webpack = require('webpack');

module.exports = (env) => {
  // Get the root path (assuming your webpack config is in the root of your project!)
  const envFolderPath = `${path.join(__dirname)}/env`;

  // Create the fallback path (the production .env)
  const prodEnv = envFolderPath + '/.env';

  // We're concatenating the environment name to our filename to specify the correct env file!
  let envKeys = {};

  if(env && env.ENVIRONMENT)
  {
    const envPath = `${envFolderPath}/${env.ENVIRONMENT}.env`;
    if(fs.existsSync(envPath))
    {
      const finalPath = fs.existsSync(envPath) ? envPath : prodEnv;
      const fileEnv = dotenv.config({ path: finalPath }).parsed;

      envKeys = Object.keys(fileEnv).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
        return prev;
      }, {});
    }
  }

  const commonPath = `${envFolderPath}/.env`;
  const fileCommon = dotenv.config({ path: commonPath}).parsed;
  const commonKeys = Object.keys(fileCommon).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileCommon[next]);
    return prev;
  }, {});

  const allKeys = {...commonKeys, ...envKeys };
  console.log(allKeys);


  return {

    module: {
      rules: [
        {
          test: /\.css/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          resolve: {
            extensions: ['.js', '.jsx']
          },
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader'
            }
          ]
        },
        {
        // Load all images as base64 encoding if they are smaller than 8192 bytes
          test: /\.(png|jpg|gif|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'images'
              }
            }
          ]
        },
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    plugins: [
      new webpack.DefinePlugin(allKeys),
      new HtmlWebPackPlugin({
        template: './src/index.html',
        filename: './index.html'
      }),
    ]
  };
};