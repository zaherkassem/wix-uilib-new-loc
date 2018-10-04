define([
    'react-dom',
    'react',
    'lodash',
    'baseUI/framework/uiConstants',
    'baseUI/popovers/tooltipEventCatcher',
    'baseUI/popovers/tooltipManager'
],
    function(ReactDOM, React, _, uiConstants, tooltipEventCatcher, tooltipManager) {
        'use strict';

        return React.createClass({
            displayName: 'tooltip',
            propTypes: {
                id: React.PropTypes.string,
                disabled: React.PropTypes.bool,
                value: React.PropTypes.oneOfType([
                    React.PropTypes.string.isRequired,
                    React.PropTypes.node.isRequired,
                    React.PropTypes.element.isRequired,
                    React.PropTypes.shape({
                        classPath: React.PropTypes.string.isRequired,
                        props: React.PropTypes.object.isRequired
                    })
                ]),
                noArrow: React.PropTypes.bool,
                width: React.PropTypes.string,
                alignment: React.PropTypes.string,
                delay: React.PropTypes.string,
                interactive: React.PropTypes.bool,
                openTriggers: React.PropTypes.arrayOf(React.PropTypes.oneOf(_.values(uiConstants.TOOLTIP.TRIGGERS))),
                closeTriggers: React.PropTypes.arrayOf(React.PropTypes.oneOf(_.values(uiConstants.TOOLTIP.TRIGGERS))),
                shouldTranslate: React.PropTypes.bool,
                children: React.PropTypes.element.isRequired,
                onOpen: React.PropTypes.func,
                onClose: React.PropTypes.func,
                styleType: React.PropTypes.oneOf(_.values(uiConstants.TOOLTIP.STYLE_TYPE)),
                marginsFromWindow: React.PropTypes.oneOfType([
                    React.PropTypes.number,
                    React.PropTypes.string
                ])
            },
            getDefaultProps: function () {
                return {
                    disabled: false,
                    alignment: uiConstants.TOOLTIP.ALIGNMENT.TOP,
                    delay: '100',
                    width: '240px',
                    interactive: false,
                    openTriggers: [uiConstants.TOOLTIP.TRIGGERS.MOUSE_ENTER],
                    closeTriggers: [uiConstants.TOOLTIP.TRIGGERS.MOUSE_LEAVE, uiConstants.TOOLTIP.TRIGGERS.CLICK],
                    onOpen: _.noop,
                    onClose: _.noop,
                    marginsFromWindow: 6
                };
            },

            getInitialState: function () {
                this.id = this.props.id || tooltipManager.generateId();
                return null;
            },


            componentDidMount: function () {
                this.forceUpdate();
            },

            componentWillUpdate: function (nextProps) {
                tooltipManager.registerOrUpdateTooltip(this.id, this.getPresenterData(nextProps));
            },

            componentWillUnmount: function () {
                tooltipManager.unRegisterTooltip(this.id);
            },

            setDelayedTooltipShow: function (delay) {
                if (!this.pendingShowDelay && !tooltipManager.isDisplayed(this.id)) {
                    this.pendingShowDelay = setTimeout(function () {
                        tooltipManager.show(this.id);
                        this.clearDelayedTooltipShow();
                    }.bind(this), delay);
                }
            },

            clearDelayedTooltipShow: function () {
                clearTimeout(this.pendingShowDelay);
                this.pendingShowDelay = null;
            },

            showTooltip: function () {
                if (!this.props.disabled) {
                    this.wasHidden = false;
                    this.setDelayedTooltipShow(this.props.delay);
                }
            },

            hideTooltip: function () {
                tooltipManager.hide(this.id);
            },

            toggleTooltip: function () {
                if (tooltipManager.isDisplayed(this.id)) {
                    this.hideTooltip();
                } else {
                    this.showTooltip();
                }
            },

            handleMouseLeave: function () {
                this.clearDelayedTooltipShow();
                tooltipManager.notifyMouseLeave(this.id);
            },

            getPresenterData: function (props) {
                props = props || this.props;
                var presenterData = _.assign({}, _.omit(props, 'children'), {
                    targetNode: ReactDOM.findDOMNode(this),
                    id: this.id
                });
                return presenterData;
            },


            render: function () {
                var supportedShowEvents = {
                    onMouseEnter: this.showTooltip,
                    onClick: this.showTooltip
                };

                var supportedHideEvents = {
                    onMouseLeave: this.handleMouseLeave,
                    onClick: this.hideTooltip
                };

                var selectedShowEvents = _.pick(supportedShowEvents, this.props.openTriggers);
                var selectedHideEvents = _.pick(supportedHideEvents, this.props.closeTriggers);
                var selectedEvents = _.assign({}, selectedShowEvents, selectedHideEvents);

                if (selectedShowEvents.onClick && selectedHideEvents.onClick){
                    selectedEvents.onClick = this.toggleTooltip;
                }

                return React.createElement(tooltipEventCatcher, selectedEvents, this.props.children);
            }
        });
    });
