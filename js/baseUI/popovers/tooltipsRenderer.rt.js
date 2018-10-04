define([
    'react/addons',
    'lodash',
    'baseUI/popovers/bubble',
    'baseUI/popovers/tooltipPresenter',
    'uiAnimations'
], function (React, _, bubble, tooltipPresenter, UA) {
    'use strict';
    function repeatTooltipData1(tooltipData, tooltipDataIndex) {
        return React.createElement(tooltipPresenter, _.assign({}, { 'key': tooltipData.id }, tooltipData));
    }
    return function () {
        return React.createElement('div', { 'className': 'tooltips-layer' }, React.createElement.apply(this, [
            UA.tooltipAnimation,
            {},
            _.map(this.state.presentedTooltips, repeatTooltipData1.bind(this))
        ]));
    };
});