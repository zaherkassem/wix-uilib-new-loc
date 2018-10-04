define(['react', 'lodash'], function (React, _) {
    'use strict';

    return {
        propTypes: {
            asyncValidator: React.PropTypes.oneOfType([
                React.PropTypes.func,
                React.PropTypes.arrayOf(React.PropTypes.objectOf(React.PropTypes.func)),
                React.PropTypes.arrayOf(React.PropTypes.func)
            ])
        },

        /**
         * @param value
         * @param onSuccess
         * @param onError
         */
        isAsyncValid: function (value, onSuccess, onError) {
            if (!this.hasAsyncValidator()) {
                onSuccess();
            }

            if (_.isFunction(this.props.asyncValidator)) {
                this.props.asyncValidator(value, onSuccess, onError);
            } else {
                var successCounter = _.size(this.props.asyncValidator);
                var successResults = {};
                var hasFailedValidation = false;

                _.forEach(this.props.asyncValidator, function (validatorFunc, validatorName) {
                    var onValidatorSuccess = function (result) {
                        if (result) {
                            successResults[validatorName] = result;
                        }

                        successCounter--;
                        if (successCounter === 0) {
                            onSuccess(successResults);
                        }
                    };

                    var onValidatorError = function (errorMessage) {
                        if (hasFailedValidation) {
                            return;
                        }
                        hasFailedValidation = true;
                        onError(errorMessage);

                    };

                    validatorFunc(value, onValidatorSuccess, onValidatorError);
                });
            }
        },

        hasAsyncValidator: function() {
            return !!this.props.asyncValidator;
        }
    };
});
