define([
    'react/addons',
    'lodash'
], function (React, _) {
    'use strict';
    return function () {
        return React.createElement('iframe', _.assign({}, {
            'src': this.props.src,
            'name': this.name,
            'ref': 'iframe'
        }, this.filteredProps()));
    };
});