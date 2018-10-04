define([
    'react',
    'baseUI/mixins/classNameMixin'
], function (React, classNameMixin) {
    'use strict';

    return React.createClass({
        mixins: [
            classNameMixin
        ],

        displayName: 'tabContent',

        getDefaultProps: function () {
            return {
                type: this.displayName
            };
        },

        getSelectedTab: function () {
            var children = this.props.children;
            var i = 1;
            var currentTab = false;
            var selected = this.props.value;

            if (children.constructor === Array) {
                children.some(function (child) {
                    if (!child) {
                        return false;
                    }
                    var type = child.props.type;

                    if (type === 'tab') {
                        if (selected === child.props.name) {
                            currentTab = child;
                        }

                        i++;
                    }

                    return Boolean(currentTab);
                }, this);
            } else if (children.constructor === Object) { // the only child
                currentTab = selected === children.props.name ? children : null;
            }

            return currentTab;
        },

        render: function () {
            return React.DOM.section({
                className: this.generateClassName('tab-content ' + this.props.value),
                style: this.props.style
            }, this.getSelectedTab());
        }
    });
});