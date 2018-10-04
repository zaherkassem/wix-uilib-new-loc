define(['react', 'baseUI/controls/toggleMixin', 'baseUI/controls/mandatory.rt'],
    function (React, booleanMixin, template) {
        'use strict';

        return React.createClass({
            displayName: 'mandatory',
            mixins: [booleanMixin],
            render: template,
            getInitialState: function () {
                this.originalDisabled = this.props.disabled;
                this.isChecked = this.getValueFromProps(this.props);
                return {
                    mandatoryTooltip: this.getTooltipValue(this.getValueFromProps(this.props), this.props.disabled, this.props.forceDisable)
                };
            },
            componentWillReceiveProps: function (nextProps) {
                if (this.props.disabled !== nextProps.disabled) {
                    this.originalDisabled = nextProps.disabled;
                    this.setState({mandatoryTooltip: this.getTooltipValue(this.isChecked, nextProps.disabled, nextProps.forceDisable)});
                }
            },
            getTooltipValue: function (isChecked, disabled, forceDisable) {
                if (disabled) {
                    return forceDisable ? this.props.hoverToolTipsKeys.forceDisabled : this.props.hoverToolTipsKeys.disabled;
                }
                return isChecked ? this.props.hoverToolTipsKeys.mandatoryEnabled : this.props.hoverToolTipsKeys.nonMandatoryEnabled;
            },
            updateTooltipValue: function (e) {
                this.setState({mandatoryTooltip: this.getTooltipValue(e.target.checked, this.props.disabled, this.props.forceDisable)});
            },
            onMandatoryFieldChecked: function (e) {
                if (this.originalDisabled) {
                    return;
                }
                this.isChecked = e.target.checked;
                this.handleChange();
                this.updateTooltipValue(e);
            }
        });
    });
