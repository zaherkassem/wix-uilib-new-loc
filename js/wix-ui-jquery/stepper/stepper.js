require('wix-ui-jquery/core/definePlugin');

var React = require('react');
var ReactDOM = require('react-dom');
var UI = require('wix-ui-react/ui');
var jQuery = require('jquery');

jQuery.fn.definePlugin('Stepper', function($){

    var defaults = {
        min: 0,
        max: 100,
        step: 1
    };

    return {
        uiComponent: UI.stepper,
        render: function (nextProps) {
            var currentProps = _.get(this, 'comp.props', {});
            var props = _.defaults(nextProps, currentProps);
            var element = React.createElement(this.uiComponent, props);
            this.comp = ReactDOM.render(element, this.$el[0]);
        },

        init: function() {
            var wixParam = this.$el.attr('wix-param');
            this.render(_.defaults({'wix-param': wixParam}, this.options));
            return this;
        },

        onChange: function (cb) {
            this.render({onChange: cb})
        },

        getDefaults: function() {
            return defaults;
        },

        getValue: function() {
            return this.comp.state.value;
        },

        setValue: function(value) {
            this.comp.setState({value: value});
            this.comp.props.onChange(value);
        }
    };
});
