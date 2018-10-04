define(['react'], function (React) {
    'use strict';

    var ERROR_DUPLICATE_VALUE_PROP = 'Cannot provide a valueLink and a value.';
    var ERROR_DUPLICATE_ON_CHANGE_PROP = 'Cannot provide a valueLink and an onChange event.';

    function verifyValueLinkProp(props) {
        if (props.valueLink !== undefined) {
            var valueLinkShapeError = React.PropTypes.shape({
                value: React.PropTypes.any,
                requestChange: React.PropTypes.func
            }).apply(this, arguments);

            if (valueLinkShapeError instanceof Error) {
                return valueLinkShapeError;
            }
            if (props.value !== undefined) {
                return new Error(ERROR_DUPLICATE_VALUE_PROP);
            }
            if (props.onChange !== undefined) {
                return new Error(ERROR_DUPLICATE_ON_CHANGE_PROP);
            }
        }
    }

    return {
        propTypes: {
            value: React.PropTypes.any,
            onChange: React.PropTypes.func,
            valueLink: verifyValueLinkProp
        },

        getValueFromProps: function (props) {
            props = props || this.props;
            return props.valueLink !== undefined ? props.valueLink.value : props.value;
        },

        callOnChangeIfExists: function (newVal, processedValueData) {
            var onChange = this.props.valueLink ? this.props.valueLink.requestChange : this.props.onChange;
            if (onChange) {
                onChange(newVal, processedValueData);
            }
        }
    };
});
