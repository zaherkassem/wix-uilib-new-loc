require('wix-ui-jquery/core/definePlugin');

var React = require('react');
var ReactDOM = require('react-dom');
var UI = require('wix-ui-react/ui');
var jQuery = require('jquery');

jQuery.fn.definePlugin('ToggleSwitch', function($){
    var defaults = {
        label: 'label',
        defaultValue: false,
        disabled: false
    };

    return {
        uiComponent: UI.toggleSwitch,
        render: function (nextProps) {
            var currentProps = _.get(this, 'comp.props', {});
            var props = _.defaults(nextProps, currentProps);
            var element = React.createElement(this.uiComponent, props);
            this.comp = ReactDOM.render(element, this.$el[0]);
        },

        init: function () {
            var wixParam = this.$el.attr('wix-param');
            this.render(_.defaults({'wix-param': wixParam}, this.options));
            return this;
        },

        onChange: function (cb) {
            this.render({onChange: cb})
        },

        disable: function () {
            this.comp.disable();
        },

        enable: function () {
            this.comp.enable();
        },

        getDefaults: function() {
            return defaults;
        },
        getValue: function() {
            return this.comp.state.checked;
        },
        setValue: function(value) {
            if (_.isBoolean(value)) {
                this.comp.handleChange(value);
            }
        }
    };
});
