require('wix-ui-jquery/core/definePlugin');

var React = require('react');
var ReactDOM = require('react-dom');
var UI = require('wix-ui-react/ui');
var jQuery = require('jquery');

jQuery.fn.definePlugin('Tooltip', function($){
    return {
        init: function() {

            var value = this.options.value;
            var alignment = this.options.alignment;
            var width = this.options.width;

            var children = this.$el.children();
            var r = React.createElement('div', {
                dangerouslySetInnerHTML: {
                    __html: children[0].outerHTML
                }
            });

            var element = React.createElement(UI.tooltip, {
                value: value,
                alignment: alignment,
                width: width,
                children: r
            });

            this.comp = ReactDOM.render(element, this.$el[0]);
            Wix.UI && Wix.UI.initialize({$rootEl: this.$el});
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
