var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');
var UI = require('wix-ui-react/ui');
var jQuery = require('jquery');

jQuery.fn.definePlugin('FontAndColorPicker', function($){
    return {
        uiComponent: UI.fontAndColorPicker,
        render: function (nextProps) {
            var currentProps = _.get(this, 'comp.props', {});
            var props = _.defaults(nextProps, currentProps);
            var element = React.createElement(this.uiComponent, props);
            this.comp = ReactDOM.render(element, this.$el[0]);
        },

        init: function() {
            var wixParamFont = this.$el.attr('wix-param-font');
            var wixParamColor = this.$el.attr('wix-param-color');
            this.render(_.defaults({'wix-param-font': wixParamFont, 'wix-param-color':wixParamColor }, this.options));
            return this;
        },

        onChange: function (cb) {
            this.render({onChange: cb})
        },

        getDefaults: function() {
            return {};
        },

        getValue: function() {
            return this.comp.getValue();
        },

        setValue: function(value) {

        }
    };
});
