define([
    'react',
    'panels',
    'util',
    'core',
    'textControls/comps/saveTextStyleConfirmation.rt'
], function (React, panels, util, core, template) {
    'use strict';

    return React.createClass({
        displayName: 'saveTextStyleConfirmation',
        mixins: [util.translationMixin, core.mixins.editorAPIMixin],
        close: function () {
            panels.panelManager.closePanelByName(this.props.panelName);
        },
        render: template
    });
});
