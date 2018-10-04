define([
    'react/addons',
    'lodash'
], function (React, _) {
    'use strict';
    function onMouseOut1() {
        this.previewColor(this.getValueFromProps());
    }
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
    function onClick3(colorObj, colorObjIndex) {
        this.selectColor(colorObj.symbol, colorObjIndex);
    }
    function onMouseEnter4(colorObj, colorObjIndex) {
        this.previewColor(colorObj.symbol);
    }
    function repeatColorObj5(colorObj, colorObjIndex) {
        return React.createElement('div', {
            'key': 'paletteColor-' + colorObjIndex,
            'className': _.keys(_.pickBy(this.getOptionClasses(colorObj), _.identity)).join(' '),
            'onClick': onClick3.bind(this, colorObj, colorObjIndex),
            'onDoubleClick': this.selectColorAndClose.bind(this, colorObj.symbol),
            'onMouseEnter': onMouseEnter4.bind(this, colorObj, colorObjIndex),
            'style': { backgroundColor: colorObj.value }
        });
    }
    return function () {
        return React.createElement.apply(this, [
            'div',
            mergeProps({
                'className': 'palette-displayer',
                'onMouseOut': onMouseOut1.bind(this)
            }, this.filteredProps()),
            _.map(this.getColors(), repeatColorObj5.bind(this))
        ]);
    };
});