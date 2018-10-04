var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');
var UI = require('wix-ui-react/ui');
var jQuery = require('jquery');


jQuery.fn.definePlugin('LanguagePicker', function($){
    return {
        uiComponent: UI.languagePicker,
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
            return {};
        },

        getValue: function() {
            return '';
        },

        setValue: function(value) {
            this.comp.handleChange(value);
        }
    };
});
