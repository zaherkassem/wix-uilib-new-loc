define(['react', 'lodash', 'textControls/comps/lineHeight.rt', 'baseUI'], function (React, _, template, baseUI) {
    'use strict';

    return React.createClass({
        displayName: 'lineHeight',
        render: template,
        mixins: [baseUI.inputMixin],
        propTypes: {
            infoText: React.PropTypes.string,
            infoTitle: React.PropTypes.string,
            options: React.PropTypes.arrayOf(React.PropTypes.shape({
                label: React.PropTypes.string.isRequired,
                value: React.PropTypes.string.isRequired
            })),
            label: React.PropTypes.string,
            value: React.PropTypes.oneOfType([
                React.PropTypes.string,
                React.PropTypes.number])
        },
        getInitialState: function () {
            var value = this.getValueFromProps();
            return {
                value: value
            };
        },
        getDefaultProps: function () {
            return {
                options: [
                    {value: 'auto', label: 'text_editor_line_spacing_automatic'},
                    {value: 'custom', label: 'text_editor_line_spacing_customize'}
                ]
            };
        },
        getSelectedOption: function () {
            var selectedValue = this.state.value === 'auto' ? 'auto' : 'custom';
            return selectedValue;
        },
        handleSliderChange: function (val) {
            this.handleControlChange(val);
        },
        selectionChange: function (value) {
            if (value === 'auto') {
                this.handleControlChange(value);
            } else {
                this.handleControlChange(1.2);
            }
        },
        handleControlChange: function (newVal) {
            if (_.isNumber(newVal)) {
                this.setState({value: newVal});
            }
            this.callOnChangeIfExists(newVal);
        },
        componentWillReceiveProps: function (nextProps) {
            var newVal = this.getValueFromProps(nextProps);
            if (this.getValueFromProps(this.props) !== newVal) {
                this.setState({value: newVal});
            }
        }
    });
});
