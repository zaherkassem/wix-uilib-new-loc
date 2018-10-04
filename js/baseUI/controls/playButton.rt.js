define([
    'react/addons',
    'lodash'
], function (React, _) {
    'use strict';
    return function () {
        return React.createElement('div', {
            'onClick': this.onPlayButtonClick,
            'className': _.keys(_.pickBy({
                playButton: true,
                isPlaying: this.state.isPlaying
            }, _.identity)).join(' ')
        }, React.createElement('div', { 'className': 'playIcon' }));
    };
});