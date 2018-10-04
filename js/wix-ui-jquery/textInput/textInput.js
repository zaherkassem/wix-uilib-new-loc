require('wix-ui-jquery/core/definePlugin');

var React = require('react');
var ReactDOM = require('react-dom');
var UI = require('wix-ui-react/ui');
var jQuery = require('jquery');

jQuery.fn.definePlugin('Input', function ($) {

    'use strict';
    return {
        uiComponent: UI.textInput,
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

        onBlur: function (cb) {
            this.render({
                onBlur: function (reactEvent) {
                    cb($.Event(reactEvent.nativeEvent));
                }
            })
        },

        onFocus: function (cb) {
            this.render({
                onFocus: function (reactEvent) {
                    cb($.Event(reactEvent.nativeEvent));
                }
            })
        },

        setValidationFunction: function (cb) {
            this.render({validator: cb})
        },

        getDefaults: function () {

        },

        getValue: function () {
            return this.comp.getValue();
        },

        setValue: function (value) {
            this.comp.setValue(value);
        }
    };
});
