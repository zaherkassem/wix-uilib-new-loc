define([
    'react/addons',
    'lodash',
    'textControls/comps/iconButton'
], function (React, _, iconButton) {
    'use strict';
    return function () {
        return React.createElement('div', { 'className': 'text-popup-control' }, React.createElement('span', {}, React.createElement(iconButton, {
            'ref': 'popupButton',
            'isSelected': this.state.popupOpen,
            'style': { width: this.props.width },
            'onClick': this.togglePopup,
            'popupMode': true,
            'name': this.props.iconName
        }, this.props.label ? React.createElement('span', { 'key': 'textPopupLabel' }, this.props.label) : null)), React.createElement('div', {
            'className': 'tri with-shadow',
            'style': { visibility: this.state.popupOpen ? 'visible' : 'hidden' }
        }), React.createElement('div', {
            'className': 'text-popup with-shadow',
            'ref': 'popupContainer',
            'style': { visibility: this.state.popupOpen ? 'visible' : 'hidden' }
        }, React.createElement('span', {}, this.props.children)), React.createElement('div', {
            'className': 'tri cover-shadow',
            'style': { visibility: this.state.popupOpen ? 'visible' : 'hidden' }
        }));
    };
});