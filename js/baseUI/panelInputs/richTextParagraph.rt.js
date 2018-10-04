define([
    'react/addons',
    'lodash'
], function (React, _) {
    'use strict';
    function repeatChunk1(chunk, chunkIndex) {
        return React.createElement('span', { 'style': chunk.style }, chunk.text);
    }
    return function () {
        return React.createElement('div', {}, this.props.paragraphTitle ? React.createElement('div', {
            'key': 'title',
            'className': 'rich-text-paragraph-title'
        }, '\n        ', this.props.paragraphTitle, '\n    ') : null, React.createElement.apply(this, [
            'div',
            { 'className': 'rich-text-paragraph-content' },
            _.map(this.props.paragraphTextChunks, repeatChunk1.bind(this))
        ]));
    };
});