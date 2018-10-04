define([
    'react/addons',
    'lodash',
    'symbols',
    'util'
], function (React, _, symbols, util) {
    'use strict';
    function onChange1(item, itemIndex) {
        this.handleChange(item.value);
    }
    function repeatItem2(item, itemIndex) {
        return React.createElement('label', { 'key': item.value }, React.createElement('input', {
            'type': 'radio',
            'name': this.getRadioGroupId(),
            'checked': item.value === this.getValueFromProps(),
            'onChange': onChange1.bind(this, item, itemIndex)
        }), React.createElement('img', { 'src': util.media.getMediaUrl(item.iconSrc) }));
    }
    return function () {
        return React.createElement('div', {
            'className': 'control-thumbnailsSlider',
            'style': { width: this.props.width + 'px' }
        }, React.createElement.apply(this, [
            'div',
            {
                'className': 'itemsContainer',
                'style': { left: '-' + this.state.position + 'px' }
            },
            _.map(this.props.items, repeatItem2.bind(this))
        ]), !this.state.isLeftEdge ? React.createElement('div', {
            'className': 'left arrow',
            'key': 'left',
            'onMouseDown': this.startLeft,
            'onMouseUp': this.endLeft
        }, React.createElement('span', {})) : null, !this.state.isRightEdge ? React.createElement('div', {
            'className': 'right arrow',
            'key': 'right',
            'onMouseDown': this.startRight,
            'onMouseUp': this.endRight
        }, React.createElement('span', {})) : null);
    };
});