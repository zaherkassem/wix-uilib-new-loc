define([
    'react/addons',
    'lodash'
], function (React, _) {
    'use strict';
    function mergeProps(inline, external) {
        var res = _.assign({}, inline, external);
        if (inline.hasOwnProperty('style')) {
            res.style = _.defaults(res.style, inline.style);
        }
        if (inline.hasOwnProperty('className') && external.hasOwnProperty('className')) {
            res.className = external.className + ' ' + inline.className;
        }
        return res;
    }
    function repeatColor2(palette, paletteIndex, color, colorIndex) {
        return React.createElement('span', {
            'key': 'paletteRootColor-' + colorIndex,
            'className': _.keys(_.pickBy(this.getPaletteOptionColorClasses(color), _.identity)).join(' '),
            'style': { backgroundColor: color }
        });
    }
    function repeatPalette3(palette, paletteIndex) {
        return React.createElement('div', {
            'className': 'palette-option-wrapper',
            'key': 'paletteOption-' + paletteIndex,
            'onMouseEnter': this.previewPalette.bind(null, palette),
            'onMouseDown': this.selectPalette.bind(null, palette)
        }, React.createElement.apply(this, [
            'div',
            this.getPaletteOptionProps(palette),
            _.map(this.getRootColors(palette), repeatColor2.bind(this, palette, paletteIndex))
        ]));
    }
    return function () {
        return React.createElement('div', mergeProps({ 'className': 'palettes-list' }, this.filteredProps()), React.createElement.apply(this, [
            'div',
            {
                'className': 'palette-options',
                'onMouseLeave': this.resetPalette
            },
            _.map(this.props.palettes, repeatPalette3.bind(this))
        ]));
    };
});