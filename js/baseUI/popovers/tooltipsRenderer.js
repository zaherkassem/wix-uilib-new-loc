define(['react', 'lodash', 'baseUI/popovers/tooltipManager', 'baseUI/popovers/tooltipsRenderer.rt'], function (React, _, tooltipManager, template) {
    'use strict';

    return React.createClass({
        displayName: 'tooltipsRenderer',

        getInitialState: function () {
            return {
                presentedTooltips: []
            };
        },

        componentWillMount: function () {
            tooltipManager.setTooltipRenderer(this);
        },

        updateDisplayedTooltips: function(presentersArr, callback){
            this.setState({
                presentedTooltips: presentersArr
            }, callback);
        },

        render: template
    });
});
