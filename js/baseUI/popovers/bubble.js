define([
    'react-dom',
    'react',
    'lodash',
    'jquery',
    'core',
    'util',
    'baseUI/framework/uiConstants',
    'baseUI/mixins/positionRelativeToElementMixin',
    'baseUI/popovers/bubble.rt'
], function(
    ReactDOM,
    React,
    _,
    $,
    core,
    util,
    uiConstants,
    positionRelativeToElementMixin,
    template) {
    'use strict';

    var distanceFromTarget = uiConstants.BUBBLE.DISTANCE_FROM_TARGET;

    function getValueType(value) {
        if (_.isString(value)) {
            return uiConstants.TOOLTIP.VALUE_TYPE.STRING;
        } else if (value && value.classPath && value.props) {
            return uiConstants.TOOLTIP.VALUE_TYPE.CLASS;
        }
        return uiConstants.TOOLTIP.VALUE_TYPE.TEMPLATE;
    }

    return React.createClass({
        mixins: [util.translationMixin, util.outerClickMixin, positionRelativeToElementMixin],
        displayName: 'bubble',
        propTypes: {
            'value': React.PropTypes.oneOfType([
                React.PropTypes.string.isRequired,
                React.PropTypes.element.isRequired,
                React.PropTypes.shape({
                    classPath: React.PropTypes.string,
                    props: React.PropTypes.object
                }).isRequired
            ]),
            targetNode: React.PropTypes.object,
            mouseLeftTargetNode: React.PropTypes.bool,
            closeTriggers: React.PropTypes.arrayOf(React.PropTypes.oneOf(_.values(uiConstants.TOOLTIP.TRIGGERS))),
            width: React.PropTypes.string,
            noArrow: React.PropTypes.bool,
            styleType: React.PropTypes.oneOf(_.values(uiConstants.TOOLTIP.STYLE_TYPE)),
            marginsFromWindow: React.PropTypes.oneOfType([
                React.PropTypes.number,
                React.PropTypes.string
            ]),
            hideMethod: React.PropTypes.func,
            timeoutForMouseOverBubble: React.PropTypes.number
        },

        getInitialState: function () {
            return {
                measured: false
            };
        },

        getDefaultProps: function(){
            return {
                timeoutForMouseOverBubble: 150
            };
        },

        getClasses: function () {
            var classes = {
                'tooltip-presenter': true
            };

            classes['alignment-' + this.calculatedAlignment] = true;

            var valueType = getValueType(this.props.value);

            if (valueType !== uiConstants.TOOLTIP.VALUE_TYPE.STRING && !this.props.styleType) {
                classes['content-only'] = true;
            } else {
                switch (this.props.styleType) {
                    case uiConstants.TOOLTIP.STYLE_TYPE.SMALL:
                        classes['small-tooltip'] = true;
                        break;
                    case uiConstants.TOOLTIP.STYLE_TYPE.CONTENT_ONLY:
                        classes['content-only'] = true;
                        break;
                    default:
                        classes['normal-tooltip'] = true;
                        break;
                }
            }

            return classes;
        },

        onOuterClick: function (evt) {
            var clickedNode = evt.target;
            if (_.includes(this.props.closeTriggers, uiConstants.TOOLTIP.TRIGGERS.OUTER_CLICK)) {
                while (clickedNode) {
                    if (clickedNode === this.props.targetNode) {
                        return;
                    }
                    clickedNode = clickedNode.parentElement || clickedNode.parentNode;
                }
                this.hide();
            }
        },

        componentWillReceiveProps: function (nextProps) {
            if (nextProps.mouseLeftTargetNode) {
                this.hideAfterDelayIfMouseNotOverBubble();
            }
        },

        hide: function () {
            this.props.hideMethod();
        },

        hideAfterDelayIfMouseNotOverBubble: function() {
            setTimeout(function () {
                if (!this.mouseOverBubble) {
                    this.hide();
                }
            }.bind(this), this.props.timeoutForMouseOverBubble);
        },

        onMouseLeave: function () {
            this.mouseOverBubble = false;
            if (_.includes(this.props.closeTriggers, uiConstants.TOOLTIP.TRIGGERS.MOUSE_LEAVE)) {
                this.hideAfterDelayIfMouseNotOverBubble();
            }
        },

        onMouseEnter: function () {
            this.mouseOverBubble = true;
        },

        getContent: function () {
            var value = this.props.value;
            var valueType = getValueType(value);

            switch (valueType) {
                case uiConstants.TOOLTIP.VALUE_TYPE.STRING:
                    return React.createElement('div', {
                        className: 'content',
                        children: this.translateIfNeeded(value)
                    });
                case uiConstants.TOOLTIP.VALUE_TYPE.CLASS:
                    return React.createElement(core.lazyComponent, _.assign({
                        'moduleName': value.classPath,
                        onLoad: this.onContentLoaded
                    }, _.assign({}, value.props, {calculatedAlignment: this.calculatedAlignment})));
                case uiConstants.TOOLTIP.VALUE_TYPE.TEMPLATE:
                    return this.props.value;
            }
        },

        onContentLoaded: function () {
            this.forceUpdate();
        },

        getArrowStyle: function(){
            if (!this.calculatedAlignment || !this.isMounted() || this.props.noArrow){
                return {
                    display: 'none'
                };
            }

            var arrowSize = this.props.styleType === uiConstants.TOOLTIP.STYLE_TYPE.SMALL ? 8 : 10;
            var targetLayout = this.props.targetNode.getBoundingClientRect();
            var arrowTop, arrowLeft;
            switch (this.calculatedAlignment){
                case uiConstants.TOOLTIP.ALIGNMENT.TOP:
                    arrowTop = targetLayout.top - distanceFromTarget - arrowSize / 2;
                    arrowLeft = targetLayout.left + (targetLayout.width - arrowSize) / 2;
                    break;
                case uiConstants.TOOLTIP.ALIGNMENT.BOTTOM:
                    arrowTop = targetLayout.top + targetLayout.height + distanceFromTarget - arrowSize / 2;
                    arrowLeft = targetLayout.left + (targetLayout.width - arrowSize) / 2;
                    break;
                case uiConstants.TOOLTIP.ALIGNMENT.LEFT:
                    arrowTop = targetLayout.top + (targetLayout.height - arrowSize) / 2;
                    arrowLeft = targetLayout.left - distanceFromTarget - arrowSize / 2;
                    break;
                case uiConstants.TOOLTIP.ALIGNMENT.RIGHT:
                    arrowTop = targetLayout.top + (targetLayout.height - arrowSize) / 2;
                    arrowLeft = targetLayout.left + targetLayout.width + distanceFromTarget - arrowSize / 2;
                    break;
            }
            var $bubbleNode = $(ReactDOM.findDOMNode(this));
            var fixedPositionTopDelta = $bubbleNode.offset().top - $(window).scrollTop() - parseInt($bubbleNode.css('top'), 10);
            var fixedPositionLeftDelta = $bubbleNode.offset().left - parseInt($bubbleNode.css('left'), 10);
            return {
                position: 'fixed',
                top: arrowTop - fixedPositionTopDelta,
                left: arrowLeft - fixedPositionLeftDelta,
                height: arrowSize,
                width: arrowSize
            };
        },

        render: template
    });
});
