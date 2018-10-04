define([
    'react',
    'baseUI/mixins/classNameMixin'
], function (React, classNameMixin) {
    'use strict';

    return React.createClass({
        mixins: [
            classNameMixin
        ],

        displayName: 'tabHeader',
        childrenList: [],
        i: 1,

        getInitialState: function () {
            return {
                showMore: false
            };
        },

        getDefaultProps: function () {
            return {
                type: this.displayName
            };
        },

        showMore: function () {
            this.setState({showMore: true});
        },

        createLabel: function (elem, i) {
            return React.cloneElement(elem, {
                setSelected: this.props.setSelected,
                selected: elem.props.for !== undefined ? this.props.value === elem.props.for : this.props.value === elem.props.htmlFor,
                key: 'tab-label ' + i
            });
        },

        createShowMoreLabel: function (elem) {
            return React.cloneElement(elem, {
                showMore: this.showMore,
                key: 'tab-show-more-label'
            });
        },

        addChild: function (child) {
            if (!child) {
                return false;
            }
            var type = child.props.type;
            var showMore = (type === 'tabShowMoreLabel' && !this.state.showMore);

            if (type === 'tabLabel') {
                this.childrenList.push(this.createLabel(child, this.i));
                this.i++; //eslint-disable-line space-unary-ops
            } else if (showMore) {
                this.childrenList.push(this.createShowMoreLabel(child));
            }

            return showMore;
        },

        generateChildren: function () {
            var currentChildren = this.props.children;
            this.i = 1;
            this.childrenList = [];

            if (currentChildren.constructor === Array) {
                currentChildren.some(this.addChild, this);
            } else if (currentChildren.constructor === Object) { // the only child
                this.addChild(currentChildren);
            }

            return this.childrenList;
        },

        render: function () {
            return React.DOM.ul({
                className: this.generateClassName('tab-header'),
                style: this.props.style
            }, this.generateChildren());
        }
    });
});