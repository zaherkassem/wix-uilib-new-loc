var React = require('react');
var template = require('./tabs.rt');
var _ = require('lodash');
var tooltipManager = require('baseUI/popovers/tooltipManager');
require('./tabs.scss');

var CONTENT_WIDTH = 288;
var MENU_PADDING = 10;
module.exports = React.createClass({
    displayName: 'tabs',
    propTypes: {
        defaultTabIndex: React.PropTypes.number,
        onChange: React.PropTypes.func
    },
    getTabIndexMap: function () {
        var children = this.getChildren();
        var tabsIndexMap = [];
        var childInex = 0;
        _.forEach(children, function (child) {
            if (!_.isUndefined(child.props.tab)) {
                tabsIndexMap.push(childInex);
            }
            childInex++;
        });
        return tabsIndexMap;
    },
    getInitialState: function () {
        this.info = {};
        return {
            tabIndexMap: this.getTabIndexMap(),
            info: {}
        };
    },
    getMenuLabelWidth: function () {
        var totalWidth = Wix.Utils.getWidth() || document.body.offsetWidth;
        return totalWidth - 2 * MENU_PADDING - CONTENT_WIDTH;
    },
    componentDidMount: function () {
        this.invokeTabChangeCallbacks();
        this.setActiveTab(this.props.defaultTabIndex || 0);
    },
    onScroll: function () {
        tooltipManager.hideAll();
    },
    invokeTabChangeCallbacks: function () {
        var activeTabComp = this.getTabByIndex(this.state.activeTabIndex);
        if (_.isFunction(_.get(activeTabComp, 'props.onActive'))) {
            activeTabComp.props.onActive();
        }
        if (_.isFunction(this.props.onChange)) {
            this.props.onChange(this.state.activeTabIndex);
        }
    },
    resetScrollTop: function () {
        this.refs.customScroll.updateScrollPosition(0);
    },
    setActiveTab: function (index, isChildIndex) {
        tooltipManager.hideAll();
        var tabIndex = isChildIndex ? index : this.state.tabIndexMap[index];
        if (!_.isUndefined(tabIndex)) {
            this.setState({
                activeTabIndex: tabIndex
            }, function () {
                this.resetScrollTop();
                this.invokeTabChangeCallbacks();
            });
        }
    },
    showTabNotification: function (index, tooltip) {
        this.info[index] = { tooltip } ;
        this.setState({
            info: this.info
        });
    },
    removeTabNotification: function (index) {
        var newInfo = _.cloneDeep(this.state.info);
        newInfo = _.pick(newInfo, (value, key)=> {
            return index != key;
        });
        this.setState({
            info: newInfo
        });
    },
    shouldShowNotification: function (index) {
        return this.state.info[index];
    },
    getNotificationText: function (index) {
        if (this.state.info[index]) {
            return this.state.info[index].tooltip;
        }
    },
    isActiveTab: function (tabIndex) {
        return tabIndex === this.state.activeTabIndex;
    },
    getTabByIndex: function (tabIndex) {
        return _.get(this.props, 'children[' + tabIndex + ']');
    },
    getChildren: function() {
        return _.isArray(this.props.children) ? this.props.children : [this.props.children];
    },
    tabClicked: function (tabIndex) {
        this.setActiveTab(tabIndex, true);
    },
    render: template
});
