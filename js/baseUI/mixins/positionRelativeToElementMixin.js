define([
    'react-dom',
    'lodash',
    'react',
    'jquery',
    'util',
    'baseUI/framework/uiConstants'
], function(ReactDOM, _, React, $, util, uiConstants) {
    'use strict';

    var verticalAlignments = [uiConstants.TOOLTIP.ALIGNMENT.BOTTOM, uiConstants.TOOLTIP.ALIGNMENT.TOP];
    var distanceFromTarget = uiConstants.BUBBLE.DISTANCE_FROM_TARGET;

    function getWindowSize() {
        return {
            width: $(window).width(),
            height: $(window).height()
        };
    }

    return {
        mixins: [util.singlePassDOMReadWriteMixin],

        PropTypes: {
            alignment: React.PropTypes.oneOf(_.values(uiConstants.TOOLTIP.ALIGNMENT)),
            overridePositionAdjustments: React.PropTypes.shape({
                type: React.PropTypes.oneOf(_.values(uiConstants.TOOLTIP.ALIGNMENT)).isRequired,
                value: React.PropTypes.number.isRequired
            })
        },

        getInitialState: function(){
            this.calculatedAlignment = null;
            return {};
        },

        getDefaultProps: function () {
            return {
                alignment: uiConstants.TOOLTIP.ALIGNMENT.TOP
            };
        },

        getPosition: function () {
            var isVerticalAlignment = _.includes(verticalAlignments, this.props.alignment);
            var position = {
                top: 0,
                left: 0
            };
            if (isVerticalAlignment) {
                position.top = this.getTopInVerticalAlignment();
                position.left = this.getLeftInVerticalAlignment();
            } else {
                position.top = this.getTopInHorizontalAlignment();
                position.left = this.getLeftInHorizontalAlignment();
            }

            position.top += $(window).scrollTop();
            return position;
        },

        getLayouts: function(){
            var windowSize = getWindowSize();
            var targetLayout = this.props.targetNode.getBoundingClientRect();
            var selfLayout = ReactDOM.findDOMNode(this).getBoundingClientRect();

            return {
                window: windowSize,
                target: targetLayout,
                self: selfLayout
            };
        },

        getTopInVerticalAlignment: function(){
            var layouts = this.getLayouts();
            var result = 0;

            var canFitAboveTarget = layouts.target.top - distanceFromTarget - layouts.self.height > 0;
            var canFitBelowTarget = layouts.target.bottom + distanceFromTarget + layouts.self.height < layouts.window.height;
            var isTopAlignment = this.props.alignment === uiConstants.TOOLTIP.ALIGNMENT.TOP;
            var isBottomAlignment = this.props.alignment === uiConstants.TOOLTIP.ALIGNMENT.BOTTOM;

            var shouldPositionAboveTarget = (isTopAlignment && canFitAboveTarget) || (isBottomAlignment && !canFitBelowTarget);

            if (shouldPositionAboveTarget) {
                result = layouts.target.top - distanceFromTarget - layouts.self.height;
                this.updateCalculatedAlignmentAndRender(uiConstants.TOOLTIP.ALIGNMENT.TOP);
            } else {
                result = layouts.target.bottom + distanceFromTarget;
                this.updateCalculatedAlignmentAndRender(uiConstants.TOOLTIP.ALIGNMENT.BOTTOM);
            }

            return result;
        },

        getLeftInVerticalAlignment: function(){
            var result;
            var layouts = this.getLayouts();
            var targetCenterX = Math.floor(layouts.target.left + (layouts.target.width / 2));
            var leftPosCenteredOnTarget = targetCenterX - (layouts.self.width / 2);

            var leftPosToUse = this.applyLeftRightOverridePositionAdjustments() || leftPosCenteredOnTarget;

            var maxAllowedLeft = layouts.window.width - this.props.marginsFromWindow - layouts.self.width;
            var minAllowedLeft = this.props.marginsFromWindow;
            var leftAdjustedToScreen = util.math.ensureWithinLimits(leftPosToUse, minAllowedLeft, maxAllowedLeft);

            result = leftAdjustedToScreen;

            return result;
        },

        getTopInHorizontalAlignment: function(){
            var result;
            var layouts = this.getLayouts();

            var targetCenterY = Math.floor(layouts.target.top + (layouts.target.height / 2));
            var topPosCenteredOnTarget = targetCenterY - (layouts.self.height / 2);

            var topPosToUse = this.applyTopBottomOverridePositionAdjustments() || topPosCenteredOnTarget;

            var maxAllowedTop = layouts.window.height - this.props.marginsFromWindow - layouts.self.height;
            var minAllowedTop = this.props.marginsFromWindow;
            result = util.math.ensureWithinLimits(topPosToUse, minAllowedTop, maxAllowedTop);

            return result;
        },

        getLeftInHorizontalAlignment: function(){
            var layouts = this.getLayouts();
            var result = 0;

            var canFitLeftOfTarget = layouts.target.left - distanceFromTarget - layouts.self.width > 0;
            var canFitRightOfTarget = layouts.target.right + distanceFromTarget + layouts.self.width < layouts.window.width;
            var isLeftAlignment = this.props.alignment === uiConstants.TOOLTIP.ALIGNMENT.LEFT;
            var isRightAlignment = this.props.alignment === uiConstants.TOOLTIP.ALIGNMENT.RIGHT;

            var shouldPositionLeftOfTarget = (isLeftAlignment && canFitLeftOfTarget) || (isRightAlignment && !canFitRightOfTarget);

            if (shouldPositionLeftOfTarget) {
                result = layouts.target.left - distanceFromTarget - layouts.self.width;
                this.updateCalculatedAlignmentAndRender(uiConstants.TOOLTIP.ALIGNMENT.LEFT);
            } else {
                result = layouts.target.right + distanceFromTarget;
                this.updateCalculatedAlignmentAndRender(uiConstants.TOOLTIP.ALIGNMENT.RIGHT);
            }

            return result;
        },

        applyLeftRightOverridePositionAdjustments: function(){
            var layouts = this.getLayouts();
            var overridePositionAdjustments = this.props.overridePositionAdjustments;
            var targetCenterX = Math.floor(layouts.target.left + (layouts.target.width / 2));

            if (overridePositionAdjustments && overridePositionAdjustments.type === uiConstants.TOOLTIP.ALIGNMENT.LEFT) {
                return targetCenterX - overridePositionAdjustments.value;
            } else if (overridePositionAdjustments && overridePositionAdjustments.type === uiConstants.TOOLTIP.ALIGNMENT.RIGHT) {
                return targetCenterX + overridePositionAdjustments.value - layouts.self.width;
            }

            return null;
        },

        applyTopBottomOverridePositionAdjustments: function(){
            var layouts = this.getLayouts();
            var overridePositionAdjustments = this.props.overridePositionAdjustments;
            var targetCenterY = Math.floor(layouts.target.top + (layouts.target.height / 2));

            if (overridePositionAdjustments && overridePositionAdjustments.type === uiConstants.TOOLTIP.ALIGNMENT.TOP) {
                return targetCenterY - overridePositionAdjustments.value;
            } else if (overridePositionAdjustments && overridePositionAdjustments.type === uiConstants.TOOLTIP.ALIGNMENT.BOTTOM) {
                return targetCenterY + overridePositionAdjustments.value - layouts.self.height;
            }

            return null;
        },

        updateCalculatedAlignmentAndRender: function (alignment) {
            if (this.calculatedAlignment !== alignment) {
                this.calculatedAlignment = alignment;
                this.forceUpdate();
            }
        },

        measurePhase: function () {
            return this.getPosition();
        },

        patchPhase: function (position) {
            var style = {
                top: position.top,
                left: position.left
            };
            var domNode = ReactDOM.findDOMNode(this);
            $(domNode).offset(style);
        }

    };
});