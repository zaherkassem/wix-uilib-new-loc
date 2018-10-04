var React = require('react');
var template = require('wix-ui-react/components/panels/basicPanel.rt');

module.exports = React.createClass({

    displayName: 'Panel',
    getStyle: function() {
        return  {
            zIndex: 1700,
            top: 30,
            left: 100,
            position: 'absolute',
            width: 210,
            height: 325,
            borderRadius: 10,
            overflow: 'hidden',
            boxShadow: '2px 2px 10px 2px rgba(10,20,30,0.3)',
            textAlign: 'center',
            backgroundColor: '#fff'//'rgba(248, 245, 236, 0.2)'
        };
    },

    render: template
});