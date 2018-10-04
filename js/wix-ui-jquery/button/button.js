require('wix-ui-jquery/core/definePlugin');

var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');
var UI = require('wix-ui-react/ui');
var jQuery = require('jquery');

jQuery.fn.definePlugin('Button', function($){
    return {
        render: function (nextProps) {
            var currentProps = _.get(this, 'comp.props', {});
            var props = _.defaults(nextProps, currentProps);
            var element =  React.createElement(UI.button, props);
            this.comp = ReactDOM.render(element, this.$el[0]);
        },
        init: function () {
            var props = _.defaults({}, this.options);
            this.render(props);
            return this;
        },

        onClick: function (cb) {
            this.render({onClick: cb})
        },

        disable: function () {
            this.render({disabled: true});
        },

        enable: function () {
            this.render({disabled: false});
        },

        getDefaults: function () {
            return {
                label: 'label'
            };
        },

        getValue: function () {
            return '';
        },

        setValue: function (value) {

        }
    };
});