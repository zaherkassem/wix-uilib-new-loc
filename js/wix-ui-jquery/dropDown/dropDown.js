require('wix-ui-jquery/core/definePlugin');

var React = require('react');
var ReactDOM = require('react-dom');
var UI = require('wix-ui-react/ui');
var jQuery = require('jquery');

jQuery.fn.definePlugin('DropDown', function($){

    var defaults = {
        title: 'title',
        options: [
            { value: '1', label: 'The first one'},
            { value: '2', label: 'The second one'},
            { value: '3', label: 'last but not least'}
        ]
    };

    var getProps = function () {
        return _.defaults({
            'wix-param': this.$el.attr('wix-param'),
            'valueLink': 'selectedValue'
        }, this.options, defaults);
    };

    return {
        uiComponent: UI.dropDownSelect,
        render: function (nextProps) {
            var currentProps = _.get(this, 'comp.props', {});
            var props = _.defaults(nextProps, currentProps);
            var element = React.createElement(this.uiComponent, props);
            this.comp = ReactDOM.render(element, this.$el[0]);
        },

        init: function() {
            this.render(getProps.call(this));
            return this;
        },

        onChange: function (cb) {
            this.render({onChange: cb})
        },

        getDefaults: function() {
            return defaults;
        },

        getValue: function() {
            return this.comp.state.value;
        },

        setValue: function(value) {
            this.comp.handleChange(value);
        }
    };
});
