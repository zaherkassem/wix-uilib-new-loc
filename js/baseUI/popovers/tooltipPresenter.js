define([
    'react',
    'lodash',
    'baseUI/popovers/tooltipManager',
    'baseUI/popovers/tooltipPresenter.rt'], function
    (React, _, tooltipManager, template) {
    'use strict';

    return React.createClass({
        displayName: 'tooltipPresenter',
        propTypes: {
            id: React.PropTypes.string
        },
        getBubbleProps: function(){
            return _.assign({}, this.props, {
                hideMethod: tooltipManager.hide.bind(tooltipManager, this.props.id)
            });
        },
        render: template
    });
});
