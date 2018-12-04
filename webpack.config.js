const path = require('path');

module.exports = {
    context: __dirname,
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        chunkFilename: '[name].js',
        publicPath: './dist/',
    },
    module: {
        rules: [            
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            '@babel/plugin-proposal-class-properties',
                            '@babel/plugin-syntax-dynamic-import',
                        ],
                    }
                }
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ],
            },           
            {
                test: /\.(png|jpg|gif|otf)$/i,
                use: [ 'url-loader' ],
            },           
        ]
    },    
    devServer: {
        compress: true,
        openPage: 'webpack-dev-server/index.html'
    },
    devtool: 'eval-source-map',
};