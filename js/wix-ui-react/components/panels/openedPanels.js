var React = require('react');
var _ = require('lodash');
var template = require('wix-ui-react/components/panels/openedPanels.rt');
var panelsManagerFactory = require('panels/panelManager/panelManagerFactory');

module.exports = React.createClass({

    displayName: 'OpenedPanels',

    getOpenedPanels: function() {
        var op = panelsManagerFactory.getManager().getOpenPanels();
        var comps = _.map(op, function(item){
            return item.comp;
        });
        return comps;
    },

    getInitialState: function () {
        this.initPanelManager();

        return {
            openPanels: this.getOpenedPanels()
        };
    },

    onPanelsUpdated: function () {
        this.setState({
            openPanels: this.getOpenedPanels()
        });

    },

    initPanelManager: function () {
        panelsManagerFactory.getManager().registerObserver(this.onPanelsUpdated);
    },

    render: template
});