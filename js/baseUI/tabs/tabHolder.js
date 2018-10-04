define([
    'react',
    'baseUI/panelInputs/inputMixin',
    'baseUI/mixins/classNameMixin'
], function(
    React,
    inputMixin,
    classNameMixin
){
    'use strict';

    return React.createClass({
        mixins: [
            inputMixin,
            classNameMixin
        ],

        displayName: 'tabs',

        propTypes: {
            className: React.PropTypes.string,
            style: React.PropTypes.object,
            defaultTab: React.PropTypes.any
        },

        getInitialState: function(){
            return {
                value: this.getValueFromProps(this.props) !== undefined ? this.getValueFromProps(this.props) : this.props.defaultTab
            };
        },

        componentWillReceiveProps: function (nextProps){
            var newVal = this.getValueFromProps(nextProps);

            if (newVal !== undefined && this.state.value !== newVal) {
                this.setState({value: newVal});
            }
        },

        setSelected: function(value){
            this.callOnChangeIfExists(value);
            this.setState({value: value});
        },

        generateChildren: function(){
            var children = [];

            React.Children.forEach(this.props.children, function(child){
                var type = child.props.type;

                if (type === 'tabHeader'){
                    var headerProps = {
                        setSelected: this.setSelected,
                        value: this.state.value,
                        key: 'tab-header'
                    };
                    if (this.props.headerStyle){
                        headerProps.style = this.props.headerStyle;
                    }
                    children.push(React.cloneElement(child, headerProps));
                } else if (type === 'tabContent'){
                    children.push(React.cloneElement(child, {
                        value: this.state.value,
                        key: 'tab-content'
                    }));
                } else {
                    children.push(child);
                }
            }, this);

            return children;
        },

        render: function(){
            return React.DOM.section({
                className: this.generateClassName('tabs'),
                style: this.props.style
            }, this.generateChildren());
        }
    });
});