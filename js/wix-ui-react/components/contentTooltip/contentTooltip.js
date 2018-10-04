var React = require('react');
var template = require('./contentTooltip.rt');
require('./contentTooltip.scss');

module.exports = React.createClass({
    displayName: 'contentTooltip',
    getInitialState: function () {
        return {
            shouldUseTooltip: true
        };
    },
    setShouldUseTooltipState: function () {
        var shouldUseTooltip = true;
        var labelText = _.get(this, 'refs.labelText');
        if (labelText) {
            shouldUseTooltip = labelText.clientWidth < labelText.scrollWidth;
        }
        this.setState({
            shouldUseTooltip: shouldUseTooltip
        });
    },
    componentDidMount: function() {
        this.setShouldUseTooltipState();
        // fixing first measure bug
        setTimeout(this.setShouldUseTooltipState, 100);
        window.addEventListener("resize", this.setShouldUseTooltipState);
    },
    componentWillUnmount: function() {
        window.removeEventListener("resize", this.setShouldUseTooltipState);
    },
    getStyleType: function () {
        return this.props.styleType || 'normal';
    },
    render: template
});
