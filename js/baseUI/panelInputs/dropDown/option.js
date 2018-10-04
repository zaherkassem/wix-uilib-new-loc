define([
    'react',
    'util',
    'baseUI/mixins/classNameMixin',
    'baseUI/panelInputs/dropDown/dropdownManager'
], function (
    React,
    util,
    classNameMixin,
    dropdownManager
) {
    'use strict';

    return React.createClass({
        displayName: 'option',

        mixins: [
            classNameMixin,
            util.translationMixin
        ],

        propTypes: {
            value: React.PropTypes.any,
            index: React.PropTypes.number,
            autotranslate: React.PropTypes.bool
        },

        getDefaultProps: function(){
            return {
                type: 'option'
            };
        },

        getInitialState: function(){
            return {
                selected: dropdownManager.getSelectedIndex() === this.props.index,
                hovered: this.props.hovered
            };
        },

        componentWillReceiveProps: function(nextProps){
            var newVal = nextProps.value;
            var nextState = {};

            if (this.props.value !== newVal) {
                nextState.value = newVal;
            }

            nextState.selected = dropdownManager.getSelectedIndex() === this.props.index;
            this.setState(nextState);
        },

        select: function(){
            dropdownManager.select(this);
        },

        getData: function(){
            return {
                value: this.props.value,
                index: this.props.index,
                content: this.content
            };
        },

        hover: function(){
            this.setState({
                hovered: true
            });
        },

        unhover: function(){
            this.setState({
                hovered: false
            });
        },

        onMouseEnter: function(){
            dropdownManager.setHovered(this);
        },

        render: function(){
            var className = 'option';

            this.content = this.props.children || '';

            if (this.state.selected){
                className += ' selected';
            } else if (this.state.hovered || this.props.hovered){
                className += ' hovered';
            }

            if (this.props.autotranslate && typeof this.content === 'string'){
                this.content = this.translateIfNeeded(this.content.trim());
            }

            dropdownManager.addOption(this);

            return React.DOM.li({
                onClick: this.select,
                className: this.generateClassName(className),
                style: this.props.style,
                onMouseEnter: this.onMouseEnter,
                onMouseLeave: this.unhover
            }, this.content);
        }
    });
});
