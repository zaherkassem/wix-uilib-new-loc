var webpack = require('webpack');
var path = require('path');

module.exports = function (config) {
    config.set({
        basePath: "",
        browsers: [ 'PhantomJS' ],
        //browsers: [ 'Chrome' ],
        singleRun: false,
        frameworks: [ 'jasmine' ],
        files: [
            'node_modules/babel-polyfill/dist/polyfill.js',
            'http://static.parastorage.com/services/js-sdk/1.65.0/js/wix.min.js',
            'http://code.jquery.com/jquery-2.1.4.min.js',
            'node_modules/react/dist/react-with-addons.js',
            'node_modules/react-dom/dist/react-dom.js',
            { pattern: '**/__tests__/*Spec.js', watched: false }
        ],
        preprocessors: {
            '**/__tests__/*Spec.js': ['webpack', 'sourcemap' ]
        },
        webpack: {
            devtool: 'inline-source-map',
            module: {
                loaders: [
                    {test: /\.js$/, exclude: [/node_modules/, /keyboardmaster/], loader: 'babel-loader'},
                    {test: /\.rt/, loader: "react-templates-loader"},
                    {test: /\.css$/, loader: "style-loader!css-loader"},
                    {
                        test: /\.scss$/,
                        loader: "style-loader!css-loader!sass-loader?functions=selector-parse&root=" + path.resolve('./js')
                    },
                    //{test: /\.js$/, loaders: ['eslint-loader'], exclude: [/node_modules/, /vendors/]},
                    {test: /\.js$/, loader: __dirname + '/webpack-loaders/santa-loader.js'}
                ]
            },
            resolve: {
                root: path.resolve('./js'),
                extensions: ['', '.js'],
                alias: {
                    'keyboardMaster': 'keyboardmaster/keymasterPhantom',
                    'panels$': 'overrides/panels',
                    'ckeditor': 'overrides/ckeditor'
                }
            },
            externals: {
                react: 'React',
                'react/addons': 'React',
                'react-dom': 'ReactDOM',
                jquery: '$',
                Wix: 'Wix'
            }
        },
        reporters: ['progress'],
        webpackMiddleware: {
            noInfo: true
        },
        port: 9876,
        colors: true,
        plugins: [
            require('karma-webpack'),
            require('karma-jasmine'),
            require('karma-phantomjs-launcher'),
            require('karma-chrome-launcher'),
            require('karma-sourcemap-loader'),
            require('karma-teamcity-reporter')
        ]
    });
};
