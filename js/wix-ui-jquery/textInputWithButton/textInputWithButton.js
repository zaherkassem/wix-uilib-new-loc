require('wix-ui-jquery/core/definePlugin');

var React = require('react');
var ReactDOM = require('react-dom');
var UI = require('wix-ui-react/ui');
var jQuery = require('jquery');

jQuery.fn.definePlugin('TextInputWithButton', function ($) {
    'use strict';
    return {
        uiComponent: UI.textInputWithButton,
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
        onButtonClick: function (cb) {
            this.render({onButtonClick: cb})
        },
        setValidationFunction: function (cb) {
            this.render({validator: cb})
        },
        setAsyncValidationFunction: function (cb) {
            this.render({asyncValidator: cb})
        },
        getDefaults:function() {

        },
        getValue: function() {
            return this.comp.getValue();
        },
        setValue: function(value) {
            this.comp.setValue(value);
        }
    };
});
