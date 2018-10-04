define(['react', 'lodash', 'textControls/utils/fontUtils'], function (React, _, fontUtils) {
    'use strict';

    var loadedFonts = [];

    return React.createClass({
        displayName: 'themeFontsLoader',
        render: function () {
            var newLinkNodes = [];
            try {
                var fontsToLoad = fontUtils.getFontsToLoad('', this.props.documentType, this.props.languages, this.props.themeFonts);
                _.forEach(fontsToLoad.urls, function(url) {
                    if (!_.includes(loadedFonts, url)) {
                        newLinkNodes.push(React.DOM.link({rel: 'stylesheet', type: 'text/css', href: url, key: url}));
                        loadedFonts.push(url);
                    }
                });
            } catch(e) {
                console.log(e);
            }

            return React.DOM.div.apply(undefined, newLinkNodes);
        },
        shouldComponentUpdate: function(nextProps) {
            return !_.isEqual(nextProps, this.props);
        }
    });
});
