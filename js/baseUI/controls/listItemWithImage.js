define(['react', 'lodash', 'baseUI/controls/listItemWithImage.rt'], function (React, _, template) {
    'use strict';

    return React.createClass({
        displayName: 'listItemWithImage',
        render: template,
        propTypes: {
            title: React.PropTypes.string,
            desc: React.PropTypes.string,
            url: React.PropTypes.string.isRequired,
            callback: React.PropTypes.func.isRequired
        },
        onItemClick: function () {
            if (this.props.callback) {
                this.props.callback();
            }
        }
    });
});
