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
    function scopeDef2() {
        var def = this.getSvgDef();
        return React.createElement('svg', mergeProps({
            'className': this.getClassName('symbol-' + this.props.name),
            'style': this.props.style ? this.props.style : {},
            'onClick': this.props.onClick,
            'dangerouslySetInnerHTML': { __html: def.content }
        }, def.svg));
    }
    return function () {
        return scopeDef2.apply(this, []);
    };
});