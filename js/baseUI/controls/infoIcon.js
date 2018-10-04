define([
    'react-dom',
    'react',
    'lodash',
    'baseUI/framework/uiConstants',
    'baseUI/popovers/templates/imageAndTextTooltip/imageAndTextTooltip',
    'baseUI/mixins/classNameMixin',
    'baseUI/mixins/reportUIChangeMixin',
    'baseUI/controls/infoIcon.rt'
], function(
    ReactDOM,
    React,
    _,
    uiConstants,
    imageAndTextTooltipTemplate,
    classNameMixin,
    reportUIChangeMixin,
    template) {
    'use strict';

    function getTooltipBoundsRect(dom) {
        var node = dom;
        while (node && node.parentElement && !node.dataset.tooltipBounds) {
            node = node.parentElement;
        }

        if (node) {
            return node.getBoundingClientRect();
        }
    }

    return React.createClass({
        displayName: 'infoIcon',
        propTypes: {
            title: React.PropTypes.string,
            text: React.PropTypes.string.isRequired,
            alignment: React.PropTypes.string,
            fitToBounds: React.PropTypes.bool,
            symbolName: React.PropTypes.string,
            tooltipWidth: React.PropTypes.string,
            propagate: React.PropTypes.bool
        },
        mixins: [classNameMixin, reportUIChangeMixin],
        contextTypes: {
            reportUIChange: React.PropTypes.func
        },
        getDefaultProps: function () {
            return {
                alignment: uiConstants.TOOLTIP.ALIGNMENT.TOP,
                fitToBounds: true,
                symbolName: 'infoIcon'
            };
        },
        getTooltipValue: function () {
            return React.createElement(imageAndTextTooltipTemplate, _.assign({}, this.props));
        },
        getTooltipsPanelBounds: function () {
            var clientRect = getTooltipBoundsRect(ReactDOM.findDOMNode(this));

            return {
                left: clientRect ? clientRect.left : 180,
                width: clientRect ? clientRect.width : 500
            };
        },
        onClick: function (e) {
            if (!this.props.propagate) {
                e.stopPropagation();
            }
        },
        handleMouseEnter: function () {
            this.reportUIChange({state: 'open', control_name: this.props.text});
        },
        handleMouseLeave: function () {
            this.reportUIChange({state: 'close', control_name: this.props.text});
        },
        render: template
    });
});
