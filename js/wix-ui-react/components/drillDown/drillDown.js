var template = require('./drillDown.rt');
require("baseUI/controls/drillDown.scss");
require("./overrides.scss");

module.exports = React.createClass({
    displayName: 'drillDown',
    propTypes: {
        label: React.PropTypes.string,
        className: React.PropTypes.string,
        onClick: React.PropTypes.func,
        disabled: React.PropTypes.bool,
        icon: React.PropTypes.string
    },
    getIcon: function () {
        if (this.props.icon) {
            return this.props.icon;
        }
        if ( _.includes(this.props.className, 'btn-back')) {
            return 'arrowLeftSmall';
        }
        return undefined;
    },
    getProps: function () {
        return _.defaults({
            icon: this.getIcon()
        }, this.props);
    },
    render: template
});