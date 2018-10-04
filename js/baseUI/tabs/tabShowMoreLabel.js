define([
    'react',
    'baseUI/mixins/classNameMixin'
], function(
    React,
    classNameMixin
){
    'use strict';

    return React.createClass({
        displayName: 'tabShowMoreLabel',

        mixins: [
            classNameMixin
        ],

        getDefaultProps: function(){
            return {
                type: this.displayName
            };
        },

        render: function(){
            return React.DOM.a({
                onClick: this.props.showMore,
                className: this.generateClassName('tab-show-more-label'),
                style: this.props.style
            }, this.props.children);
        }
    });
});