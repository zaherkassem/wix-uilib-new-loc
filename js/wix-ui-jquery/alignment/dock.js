require('wix-ui-jquery/core/definePlugin');

var React = require('react');
var ReactDOM = require('react-dom');
var UI = require('wix-ui-react/ui');
var jQuery = require('jquery');

jQuery.fn.definePlugin('Dock', function ($) {
    return {
        uiComponent: UI.dock,
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
        onPreviewHover: function (cb) {
            this.render({onPreviewHover: cb})
        },
        onChange: function (cb) {
            this.render({onChange: cb})
        },
        getDefaults: function () {
            return {};
        },
        getValue: function () {
            return this.comp.state.value;
        },
        setValue: function (value) {
            this.comp.handleChange(value);
        }
    };
});
