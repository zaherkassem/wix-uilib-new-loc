define(['react', 'lodash', 'baseUI/popovers/tooltipManager', 'baseUI/popovers/templates/keyboardShortcutTooltip/keyboardShortcutTooltip.rt'], function (React, _, tooltipManager, template) {
    'use strict';

    return React.createClass({
        displayName: 'keyboardShortcutTooltip',
        propTypes: {
            label: React.PropTypes.string,
            shortcut: React.PropTypes.string
        },
        getInitialState: function() {
            return {};
        },
        render: template
    });
});
