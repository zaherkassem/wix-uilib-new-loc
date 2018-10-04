define([
    'react-dom',
    'lodash',
    'react',
    'jquery',
    'baseUI/sortByDragList/dragHelper'
], function(ReactDOM, _, React, $, DragHelper) {
    'use strict';

    function getChildren() {
        if (this.props.childrenTransition) {
            return React.createElement(this.props.childrenTransition, this.props.transitionProps, this.props.children);
        }

        return this.props.children;
    }

    var SortByDragList = React.createClass({

        displayName: 'SortByDragList',

        propTypes: {
            childrenTransition: React.PropTypes.func, // React.addons.TransitionGroup class
            transitionProps: React.PropTypes.object // The props for the TransitionGroup component
        },

        getInitialState: function() {
            this.dragHelper = new DragHelper();
            return null;
        },

        render: function () {
            var props = _.omit(this.props, ['children', 'disabled']);
            props.style = { position: 'relative' };
            return React.createElement('div', props, React.createElement('div', null, getChildren.call(this)));
        },

        startDrag: function(idx, evt) {
            if (this.props.disabled === true) {
                return;
            }
            var element = $(ReactDOM.findDOMNode(this));
            var clicked = $(evt.currentTarget);
            var onItemMoved = this.props.onItemMoved || function() {};
            var childElement = element.children().children();
            if (this.props.childrenTransition) {
                childElement = childElement.children();
            }
            this.dragHelper.startDrag(childElement.has(clicked), idx, evt, onItemMoved);
        }
    });

    return SortByDragList;
});
