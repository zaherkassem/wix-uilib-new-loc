require('wix-ui-jquery/core/definePlugin');

var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');
var UI = require('wix-ui-react/ui');
var jQuery = require('jquery');

jQuery.fn.definePlugin('Symbol', function(){
    return {
        init: function() {
            var element = React.createElement(UI.symbol, this.options);
            this.$el.css('display', 'inline-block');
            this.comp = ReactDOM.render(element, this.$el[0]);
            return this;
        },
        getDefaults: _.noop,
        getValue: _.noop,
        setValue: _.noop
    };
});