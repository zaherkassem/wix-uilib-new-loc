define(['react', 'lodash', 'baseUI/popovers/tooltipManager', 'baseUI/popovers/templates/titleBodyAndLinkTooltip/titleBodyAndLinkTooltip.rt'], function (React, _, tooltipManager, template) {
    'use strict';

    return React.createClass({
        displayName: 'titleBodyAndLinkTooltip',
        propTypes: {
            title: React.PropTypes.string,
            text: React.PropTypes.string,
            link: React.PropTypes.string,
            linkAction: React.PropTypes.func
        },
        onLinkClick: function () {
            if (this.props.linkAction) {
                this.props.linkAction();
            }
        },
        render: template
    });
});
