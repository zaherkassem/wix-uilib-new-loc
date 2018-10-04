define([
    'react',
    'baseUI/mixins/classNameMixin'
], function(
    React,
    classNameMixin
){
    'use strict';

    return React.createClass({
        displayName: 'tabLabel',

        mixins: [
            classNameMixin
        ],

        getDefaultProps: function(){
            return {
                type: this.displayName
            };
        },

        setSelected: function(){
            var props = this.props;
            var value = (typeof props.for !== 'undefined') ? props.for : props.htmlFor;
            props.setSelected(value);
        },

        render: function(){
            return React.DOM.li({
                onClick: this.setSelected,
                className: this.generateClassName('tab-label ' + (this.props.selected ? 'selected' : '')),
                style: this.props.style
            }, this.props.children);
        }
    });
});