require('wix-ui-jquery/core/definePlugin');

var React = require('react');
var ReactDOM = require('react-dom');
var UI = require('wix-ui-react/ui');
var jQuery = require('jquery');

jQuery.fn.definePlugin('TeaserPopup', function($){

    var defaults = {
        title: 'teaser title',
        text: 'Teaser text'
    };

    return {
        uiComponent: UI.teaserPopup,
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
        linkClicked: function (cb) {
            this.render({linkClicked: cb})
        },
        getDefaults: function() {
            return defaults;
        },
        getValue: function() {
            return this.comp.state.value;
        },
        setValue: function(value) {
            this.comp.setState({value: value});
        },
        onClose: function(cb) {
            this.render({onClose: cb})
        }
    };
});
