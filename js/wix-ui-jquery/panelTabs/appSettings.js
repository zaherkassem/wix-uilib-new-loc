require('wix-ui-jquery/core/definePlugin');

var React = require('react');
var ReactDOM = require('react-dom');
var jQuery = require('jquery');
var UI = require('wix-ui-react/ui');

jQuery.fn.definePlugin('appSettings', function ($) {
    'use strict';

    return {
        getDefaults: function() {
            return {};
        },

        getValue: function() {
            return null;
        },

        setValue: function(value) {
        },

        init: function(){
            var element = React.createElement(UI.appSettings, {});
            this.comp = ReactDOM.render(element, this.$el[0]);
            return this;
        }
    };
});