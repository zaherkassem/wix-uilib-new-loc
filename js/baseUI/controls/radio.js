define([
    'react-dom',
    'react',
    'lodash',
    'baseUI/panelInputs/inputMixin',
    'baseUI/controls/radio.rt'
], function(ReactDOM, React, _, inputMixin, template) {
    'use strict';

    return React.createClass({
        displayName: 'radio',
        mixins: [inputMixin],
        propTypes: {
            options: React.PropTypes.array,
            name: React.PropTypes.string,
            imageData: React.PropTypes.object,
            imageWidth: React.PropTypes.number,
            imageHeight: React.PropTypes.number,
            label: React.PropTypes.string,
            tooltip: React.PropTypes.string,
            group: React.PropTypes.string,
            onChange: React.PropTypes.func,
            disabled: React.PropTypes.bool,
            translate: React.PropTypes.bool,
            onMouseOver: React.PropTypes.func,
            onMouseOut: React.PropTypes.func,
            radioType: React.PropTypes.oneOf(['image', 'symbol', 'class'])
        },
        getDefaultProps: function () {
            return {
                disabled: false,
                translate: true
            };
        },
        isLabelEllipsisActive: function() {
            return this.props.label && this.props.ellipsis && (ReactDOM.findDOMNode(this).offsetWidth < ReactDOM.findDOMNode(this.refs.label).scrollWidth);
        },
        componentDidMount: function(){
            this.labelEllipsActive = this.isLabelEllipsisActive();
        },
        componentDidUpdate: function(){
            this.labelEllipsActive = this.isLabelEllipsisActive();
        },
        shouldShowTooltip: function() {
            return !this.props.disabled && (this.props.tooltip || this.labelEllipsActive);
        },
        getRadioClasses: function () {
            var cssClasses = {
                'svg-radio': true,
                'disabled': this.props.disabled
            };
            cssClasses['svg-radio-' + this.props.name] = true;
            return cssClasses;
        },

        render: template
    });
});
