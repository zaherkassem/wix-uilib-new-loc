define([
    'react',
    'util',
    'baseUI/mixins/classNameMixin'
], function (
    React,
    util,
    classNameMixin
) {
    'use strict';

    return React.createClass({
        displayName: 'option',

        mixins: [
            classNameMixin,
            util.translationMixin
        ],

        propTypes: {
            autotranslate: React.PropTypes.bool
        },

        getDefaultProps: function(){
            return {
                type: 'footer'
            };
        },

        render: function(){
            var content = this.props.children || '';

            if (this.props.autotranslate && typeof content === 'string'){
                content = this.translateIfNeeded(content.trim());
            }

            return React.DOM.div({
                className: this.generateClassName(this.props.className),
                style: this.props.style
            }, content);
        }
    });
});
