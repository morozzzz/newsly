module.exports = {
    context: __dirname,
    entry: './src/app.js',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    module: {},
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    devtool: 'eval-source-map',
};