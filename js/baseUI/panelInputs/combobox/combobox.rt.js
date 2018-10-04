define([
    'react/addons',
    'lodash',
    'baseUI/controls/arrowButton',
    'baseUI/controls/infoIcon'
], function (React, _, arrowButton, infoIcon) {
    'use strict';
    function onClickAction1(e) {
        {
            this.toggle(e);
        }
    }
    function onClick2(group, groupIndex, item, itemIndex, e) {
        e.stopPropagation();
        this.handleClick(item);
    }
    function onMouseEnter3(group, groupIndex, item, itemIndex) {
        this.handleMouseEnter(item);
    }
    function repeatItem4(group, groupIndex, item, itemIndex) {
        return React.createElement('li', {
            'style': item.style,
            'className': _.keys(_.pickBy({
                'wdd-item': true,
                'selected': _.isEqual(this.state.selectedItem, item),
                'focused': _.isEqual(this.state.focusedItem, item)
            }, _.identity)).join(' '),
            'onClick': onClick2.bind(this, group, groupIndex, item, itemIndex),
            'onMouseEnter': onMouseEnter3.bind(this, group, groupIndex, item, itemIndex)
        }, this.props.shouldShowOptionLabel ? React.createElement('span', { 'key': 'shouldshow' }, item.label) : null);
    }
    function repeatGroup5(group, groupIndex) {
        return React.createElement.apply(this, [
            'li',
            {
                'className': _.keys(_.pickBy({
                    'wdd-group': true,
                    'hidden': this.shouldDisplayGroupNames
                }, _.identity)).join(' ')
            },
            React.createElement('span', {}, group.groupName),
            _.map(group.items, repeatItem4.bind(this, group, groupIndex))
        ]);
    }
    return function () {
        return React.createElement('div', { 'className': 'writable-drop-down ' + (this.props.label ? '' : 'without-label') }, React.createElement('div', { 'className': 'wdd-container' }, React.createElement('div', {
            'className': 'wdd-header',
            'onClick': this.handleCancel
        }, this.props.label ? React.createElement('label', { 'key': 'label' }, this.translateIfNeeded(this.getLabel())) : null, this.props.label && (this.props.infoText || this.props.infoTitle) ? React.createElement(infoIcon, {
            'title': this.props.infoTitle,
            'key': 'infoicon',
            'text': this.props.infoText,
            'size': 18
        }) : null, React.createElement('div', { 'className': 'wdd-input' }, React.createElement('input', {
            'ref': 'input',
            'type': 'text',
            'value': this.state.text,
            'onClick': this.show,
            'onChange': this.handleChange,
            'onKeyDown': this.handleKeyDown
        })), React.createElement(arrowButton, {
            'withoutBorder': this.props.hasSmallArrow,
            'onClickAction': onClickAction1.bind(this)
        })), React.createElement('div', {
            'className': 'list-container',
            'style': { visibility: this.state.open ? 'visible' : 'hidden' },
            'ref': 'itemsListContainer'
        }, React.createElement('div', {
            'ref': 'itemsList',
            'className': 'wdd-list',
            'onWheel': this.blockOuterScroll
        }, React.createElement.apply(this, [
            'ul',
            {},
            _.map(this.props.data, repeatGroup5.bind(this))
        ])), this.props.withFooter ? React.createElement('div', {
            'key': 'withfooter',
            'className': 'footer'
        }, this.props.children) : null)));
    };
});