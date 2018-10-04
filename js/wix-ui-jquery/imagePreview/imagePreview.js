require('wix-ui-jquery/core/definePlugin');

var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');
var UI = require('wix-ui-react/ui');
var jQuery = require('jquery');

jQuery.fn.definePlugin('ImagePreview', function(){
    return {
        uiComponent: UI.imagePreview,
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

        getDefaults: _.noop,
        getValue: function () {
            return this.comp.state.value;
        },
        onChange: function (cb) {
            this.render({onChange: cb})
        },
        setValue: function (value) {
            if (this.comp.state.value !== value) {
                this.render({value: value})
            }
        },
        setButtons: function (buttons) {
            this.render({buttons: buttons});
        }
    };
});