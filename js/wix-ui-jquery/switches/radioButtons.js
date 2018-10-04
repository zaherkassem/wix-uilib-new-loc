require('wix-ui-jquery/core/definePlugin');

var React = require('react');
var ReactDOM = require('react-dom');
var UI = require('wix-ui-react/ui');
var jQuery = require('jquery');

jQuery.fn.definePlugin('RadioButtons', function ($) {

    var defaults = {
        title: 'title',
        disabled: false,
        options: [
            {value: "1", label: 'first', className: 'classfirst'},
            {value: "2", label: 'second', className: 'classSecond'}
        ],
        infoText: '',
        infoTitle: '',
        defaultValue: "1"
    };

    return {
        uiComponent: UI.radioButtons,
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

        onMouseOver: function (cb) {
            this.render({onMouseOverPreview: cb})
        },

        disable: function () {
            this.comp.disable();
        },

        enable: function () {
            this.comp.enable();
        },

        getDefaults: function () {
            return defaults;
        },
        getValue: function () {
            return this.comp.state.value;
        },
        setValue: function (value) {
            this.comp.handleChangeInner(value, 'value', _.noop);
        }
    };
});
