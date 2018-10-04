define(['react', 'lodash'], function (React, _) {
    'use strict';

    return {
        propTypes: {
            validator: React.PropTypes.oneOfType([
                React.PropTypes.func,
                React.PropTypes.arrayOf(React.PropTypes.func)
            ]),
            invalidMessage: React.PropTypes.oneOfType([
                React.PropTypes.func,
                React.PropTypes.string
            ])
        },

        /**
         * Returns true if ALL validation functions return true
         * @param value
         * @returns {boolean}
         */
        isValid: function (value) {
            if (!this.hasValidator()) {
                return true;
            }

            value = arguments.length === 0 ? this.state.value : value;

            if (_.isArray(this.props.validator)) {
                return _.every(this.props.validator, function (validator) {
                    return validator(value);
                });
            }
            return this.props.validator(value);
        },

        hasValidator: function() {
            return !!this.props.validator;
        },

        /**
         * Returns the invalid message
         * @returns {string}
         */
        getInvalidMessage: function () {
            return _.isFunction(this.props.invalidMessage) ?
                this.props.invalidMessage() : this.props.invalidMessage;
        }
    };
});