define(['react', 'lodash', 'baseUI/controls/arrowButton.rt'], function (React, _, template) {
    'use strict';

    return React.createClass({
        displayName: 'arrowButton',
        render: template,
        propTypes: {
            withoutBorder: React.PropTypes.bool,
            className: React.PropTypes.string,
            onClickAction: React.PropTypes.func
        },
        getClassName: function () {
            var addClassName = '';

            if (this.props.className) {
                addClassName += ' ' + this.props.className;
            }

            if (this.props.withoutBorder) {
                addClassName += ' without-border';
            }

            return addClassName.trim();
        }
    });
});
