define(['lodash', 'react'], function (_, React) {
    'use strict';

    return React.createClass({
        displayName: 'tooltipEventCatcher',
        propTypes: {
            'children': React.PropTypes.element.isRequired
        },

        onEvent: function (eventName, evt) {
            this.props[eventName](evt);
            if (this.props.children.props[eventName]) {
                this.props.children.props[eventName](evt);
            }
        },

        render: function () {
            // get all event props (starting with 'on'), and add a proxy methods to them
            var filteredEventProps = _(this.props)
                .reduce(function (result, value, key) {
                    if(key.indexOf('on') === 0){
                        result[key] = value;
                    }
                    return result;
                }, {});
            var extendProps = _(filteredEventProps).mapValues((value, key) => {
                    return this.onEvent.bind(this, key);
                }, this)
                .value();

            return React.cloneElement(React.Children.only(this.props.children), extendProps);
        }
    });
});
