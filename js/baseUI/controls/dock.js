define(['react', 'lodash', 'baseUI/controls/dock.rt', 'baseUI/controls/radioButtonsMixin'], function (React, _, template, radioButtonsMixin) {
    'use strict';

    var dockDirections = ['TOP_LEFT', 'TOP', 'TOP_RIGHT', 'LEFT', 'RIGHT', 'BOTTOM_LEFT', 'BOTTOM', 'BOTTOM_RIGHT'];

    return React.createClass({
        displayName: 'dock',

        propTypes: {
            value: React.PropTypes.oneOf(_.values(dockDirections))
        },

        mixins: [radioButtonsMixin],

        onDockMouseEnter: function (direction) {
            if (_.isFunction(this.props.onPreviewHover)) {
                this.props.onPreviewHover(direction);
            }
        },

        onDockChange: function (direction) {
            this.callOnChangeIfExists(direction);
        },

        render: template
    });
});
