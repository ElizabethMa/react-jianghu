## 天气预报 Application

### 构建基础项目

1. install dependencies

    ``` 
    npm init 

    npm install --save react react-dom 

    npm install --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react babel-preset-stage-0 css-loader html-webpack-plugin style-loader webpack webpack-dev-server
    ```

2. Create and configure your .babelrc file
    ```
    {
        "presets": ["react","es2015"]
    }
    ```

3. Create and configure your webpack.config.js file
    ```
    var HtmlWebpackPlugin = require('html-webpack-plugin');
    var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
      template: __dirname + '/app/index.html',
      filename: 'index.html',
      inject: 'body'
    })

    module.exports = {
      entry: [
        './app/index.js'
      ],
      output: {
        path: __dirname + '/dist',
        filename: "index_bundle.js"
      },
      module: {
        loaders: [
          {test: /\.js$/, exclude:/node_modules/, loader:"babel-loader"},
          {test: /\.css$/, loader: 'style-loader!css-loader'}
        ]
      },
      plugins: [
        HtmlWebpackPluginConfig
      ]
    }
    ```

4. index.html & index.js


Create an app directory and in your app directory create and configure your index.html file
In your app directory create and configure your index.js file to render a HelloWorld component
Start webpack and make sure everything is working
Add a production command to your scripts property in package.json which runs webpack -p
Add a start command to your scripts property in package.json which runs webpack-dev-server
Run npm run start from your terminal then check localhost:8080 to make sure everything is rendering correctly