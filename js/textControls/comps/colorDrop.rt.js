define([
    'react/addons',
    'lodash'
], function (React, _) {
    'use strict';
    return function () {
        return React.createElement('span', {}, !this.props.isBackColor && !this.props.colorDropOnly ? React.createElement('span', { 'key': 'backColorDrop' }, React.createElement('svg', {
            'xmlns': 'http://www.w3.org/2000/svg',
            'className': 'symbol-textForeColor',
            'xmlns:xlink': 'http://www.w3.org/1999/xlink',
            'width': '22px',
            'height': '18px'
        }, React.createElement('path', {
            'fill': this.props.fill ? this.props.fill : 'none',
            'fill-rule': 'evenodd',
            'd': 'M 17 3C 17 3 27.03 17 17 17 6.9 17 17 3 17 3Z'
        }), React.createElement('path', {
            'fill-rule': 'evenodd',
            'd': 'M 16.96 18C 13.35 18 12 14.95 12 13.03 12 9.97 15.69 4.09 16.12 3.43 16.12 3.43 16.95 2.12 16.95 2.12 16.95 2.12 17.8 3.42 17.8 3.42 18.23 4.08 22 9.97 22 13.03 22 15.09 20.44 18 16.96 18ZM 16.96 3.97C 16.96 3.97 13 10.18 13 13.03 13 14.52 14.02 16.99 16.96 16.99 19.89 16.99 21 14.52 21 13.03 21 10.18 16.96 3.97 16.96 3.97ZM 3.6 9.02C 3.6 9.02 2 13.03 2 13.03 2 13.03-0 13.03-0 13.03-0 13.03 5 1 5 1 5 1 6 0 6 0 6 0 7 0 7 0 7 0 8 1 8 1 8 1 11 7.01 11 7.01 11 7.01 11 11.02 11 11.02 11 11.02 9.4 9.02 9.4 9.02 9.4 9.02 3.6 9.02 3.6 9.02ZM 7 3.01C 7 3.01 6 3.01 6 3.01 6 3.01 4.4 7.01 4.4 7.01 4.4 7.01 8.6 7.01 8.6 7.01 8.6 7.01 7 3.01 7 3.01Z'
        }))) : null, this.props.isBackColor && !this.props.colorDropOnly ? React.createElement('span', { 'key': 'foreColorDrop' }, React.createElement('svg', {
            'xmlns': 'http://www.w3.org/2000/svg',
            'className': 'symbol-textBackColor',
            'xmlns:xlink': 'http://www.w3.org/1999/xlink',
            'width': '28px',
            'height': '21px'
        }, React.createElement('path', {
            'fill': this.props.fill ? this.props.fill : 'none',
            'fill-rule': 'evenodd',
            'd': 'M 23 6C 23 6 33.03 20 23 20 12.9 20 23 6 23 6Z'
        }), React.createElement('path', {
            'fill-rule': 'evenodd',
            'd': 'M 22.96 21C 19.35 21 18 17.95 18 16.03 18 12.98 21.69 7.09 22.12 6.43 22.12 6.43 22.95 5.12 22.95 5.12 22.95 5.12 23.8 6.42 23.8 6.42 24.23 7.09 28 12.97 28 16.03 28 18.09 26.44 21 22.96 21ZM 22.96 6.97C 22.96 6.97 19 13.18 19 16.03 19 17.52 20.02 20 22.96 20 25.89 20 27 17.52 27 16.03 27 13.18 22.96 6.97 22.96 6.97ZM 14 6.01C 14 6.01 15 10.02 15 10.02 15 10.02 12 10.02 12 10.02 12 10.02 13 6.01 13 6.01 13 6.01 14 6.01 14 6.01ZM 18 10.02C 18 10.02 15 4.01 15 4.01 15 4.01 14 3.01 14 3.01 14 3.01 13 3.01 13 3.01 13 3.01 12 4.01 12 4.01 12 4.01 6.63 16.03 6.63 16.03 6.63 16.03 9 16.03 9 16.03 9 16.03 11 12.02 11 12.02 11 12.02 16 12.02 16 12.02 16 12.02 16.79 13 16.79 13 16.32 14.18 16 15.26 16 16.03 16 16.93 16.3 18.07 16.98 19.04 16.98 19.04 6 19.04 6 19.04 4.9 19.04 4 18.14 4 17.03 4 17.03 4 15.03 4 15.03 4 15.03 3 15.03 3 15.03 2.45 15.03 2 14.58 2 14.03 2 13.47 2.45 13.02 3 13.02 3 13.02 4 13.02 4 13.02 4 13.02 4 11.02 4 11.02 4 11.02 3 11.02 3 11.02 2.45 11.02 2 10.57 2 10.02 2 9.47 2.45 9.02 3 9.02 3 9.02 4 9.02 4 9.02 4 9.02 4 7.01 4 7.01 4 7.01 2 7.01 2 7.01 1.45 7.01 1 6.57 1 6.01 1 5.46 1.45 5.01 2 5.01 2 5.01 4 5.01 4 5.01 4 5.01 4 2 4 2 4 2 1 2 1 2 0.45 2 0 1.56 0 1 0 0.45 0.45 0 1 0 1 0 4 0 4 0 4 0 20 0 20 0 21.1 0 22 0.9 22 2 22 2 22 4.01 22 4.01 22 4.01 21 5.01 21 5.01 21 5.01 19.43 7.1 18 10.02Z'
        }))) : null, this.props.colorDropOnly ? React.createElement('span', { 'key': 'colorDrop' }, React.createElement('svg', {
            'width': '13px',
            'height': '20px',
            'viewBox': '0 0 13 20',
            'xmlns': 'http://www.w3.org/2000/svg',
            'xmlns:xlink': 'http://www.w3.org/1999/xlink'
        }, React.createElement('g', {
            'fill': this.props.fill ? this.props.fill : 'none',
            'fill-rule': 'evenodd'
        }, React.createElement('g', { 'stroke': '#FFFFFF' }, React.createElement('path', { 'd': 'M6.444,1.22000003 L5.521,2.66700003 C5.055,3.39800003 0.968,9.90800003 0.968,13.287 C0.968,15.411 2.457,18.783 6.454,18.783 C10.302,18.783 12.032,15.569 12.032,13.287 C12.032,9.90200003 7.857,3.39000003 7.381,2.65900003 L6.444,1.22000003 L6.444,1.22000003 Z' }))))) : null);
    };
});