var React = require('react');
var options = require('baseUI/panelInputs/dropDown/options');
var openedPanels = require('wix-ui-react/components/panels/openedPanels');
var tooltipsRenderer = require('baseUI/popovers/tooltipsRenderer');


module.exports = React.createClass({
    render: function(){
        var container = React.createElement('div', {id: 'ui-lib'}, //is someone using the id?
            React.createElement(options, {}),
            React.createElement(tooltipsRenderer, {}),
            React.createElement(openedPanels, {}));

        return container;
    }
});

