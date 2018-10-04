require('wix-ui-jquery/core/definePlugin');

var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');
var UI = require('wix-ui-react/ui');
var jQuery = require('jquery');

jQuery.fn.definePlugin('SectionDividerLabeled', function($){
    return {
        init: function() {
            var element = React.createElement(UI.sectionDividerLabeled, this.options);

            this.comp = ReactDOM.render(element, this.$el[0]);
            return this;
        },

        getDefaults: function() {
            return {
                label: 'label'
            };
        },

        getValue: function() {
            return '';
        },

        setValue: function(value) {

        }
    };
});