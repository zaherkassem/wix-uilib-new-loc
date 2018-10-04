define([
    'react/addons',
    'lodash',
    'util'
], function (React, _, util) {
    'use strict';
    return function () {
        return React.createElement('div', { 'className': 'keyboardShortcutTooltip' }, !!this.props.label ? React.createElement('span', {
            'className': 'label',
            'key': 'label'
        }, util.translate(this.props.label)) : null, !!this.props.shortcut ? React.createElement('span', {
            'className': 'shortcut',
            'key': 'shortcut'
        }, '(', this.props.shortcut, ')') : null);
    };
});