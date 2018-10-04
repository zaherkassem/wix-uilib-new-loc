define([
    'react',
    'baseUI/mixins/classNameMixin'
], function(
    React,
    classNameMixin
){
    'use strict';

    return React.createClass({
        displayName: 'tab',

        mixins: [
            classNameMixin
        ],

        getDefaultProps: function(){
            return {
                type: this.displayName
            };
        },

        render: function(){
            return React.createElement('div', {
                className: this.generateClassName('tab'),
                style: this.props.style
            }, this.props.children);
        }
    });
});