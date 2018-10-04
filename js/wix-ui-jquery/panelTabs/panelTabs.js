require('wix-ui-jquery/core/definePlugin');

var React = require('react');
var ReactDOM = require('react-dom');
var UI = require('wix-ui-react/ui');
var jQuery = require('jquery');

jQuery.fn.definePlugin('panelTabs', function ($) {
    'use strict';
    return {
        uiComponent: UI.panelTabs,
        render: function (nextProps) {
            var currentProps = _.get(this, 'comp.props', {});
            var props = _.defaults(nextProps, currentProps);
            var element = React.createElement(this.uiComponent, props);
            this.comp = ReactDOM.render(element, this.$el[0]);
        },
        init: function () {
            var children = this.$el.children();
            children = children.map(function (index, child) {
                var props = {
                    dangerouslySetInnerHTML: {
                        __html: child.outerHTML
                    }
                };
                if (child.getAttribute('tab')) {
                    props.tab = child.getAttribute('tab');
                }
                return React.createElement('div', props);
            });

            var props = _.defaults({
                children: children.toArray()
            }, this.options);
            this.render(props);
            this.$el.css({height: '100%'});
            Wix.UI && Wix.UI.initialize({$rootEl: this.$el});
            return this;
        },
        getDefaults: _.noop,
        getValue: function () {
            return this.comp.state.activeTabIndex;
        },
        setValue: function (value) {
            if (_.isNumber(value)) {
                this.comp.setActiveTab(value);
            }
        },
        onChange: function (cb) {
            this.render({onChange: cb})
        },
        showTabNotification: function (index, tooltip) {
            this.comp.showTabNotification(index, tooltip);
        },
        removeTabNotification: function (index) {
            this.comp.removeTabNotification(index);
        }
    };
});
