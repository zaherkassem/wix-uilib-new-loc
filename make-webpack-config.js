const webpack = require('webpack');
const path = require('path');
var autoprefixer = require('autoprefixer');

module.exports = function (options) {
    console.log(options);

    const entry = [
        './js/promise/polyfill.js', options.entry || "./js/wix-ui-react/ui.js"
    ];

    const output = {
        path: __dirname + '/lib',
        filename: options.filename || "ui-lib.js",
        pathinfo: !options.minimize,
        library: 'UI',
        libraryTarget: 'umd',
        umdNamedDefine: true
    };

    const resolve = {
        alias: {
            'keyboardMaster': 'keyboardmaster/keymaster',
            'panels$': 'overrides/panels',
            'ckeditor': 'overrides/ckeditor'
        },
        root: path.resolve('./js'),
        extensions: ['', '.js']
    };

    const externals = options.externals || {
        react: 'React',
        'react/addons': 'React',
        'react-dom': 'ReactDOM',
        lodash: '_',
        jquery: '$',
        Wix: 'Wix',
        angular: 'angular'
    };

    const plugins = [
        new webpack.NoErrorsPlugin()
    ];

    if (options.minimize) {
        plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}));
    }

    return {
        entry,
        output,
        module: {
            loaders: [
                {test: /\.js$/, exclude: [/node_modules/, /keyboardmaster/], loader: 'babel-loader'},
                {test: /\.rt/, loader: "react-templates-loader"},
                {test: /\.css$/, loader: "style-loader!css-loader"},
                {
                    test: /\.scss$/,
                    loader: "style-loader!css-loader!postcss!sass-loader?functions=selector-parse&root=" + path.resolve('./js')
                },
                {test: /\.js$/, loader: __dirname + '/webpack-loaders/santa-loader.js'}
            ]
        },
        postcss: [
            autoprefixer({
                // update according to santa-editor/conf/grunt/gruntConfig.js
                browsers: ['last 2 ff versions', 'last 2 Chrome versions', 'last 2 Edge versions', 'Safari >= 8', 'ie >= 11']
            })
        ],
        resolve,
        plugins,
        externals
    };
};
