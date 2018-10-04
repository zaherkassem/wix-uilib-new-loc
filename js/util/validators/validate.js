define([
    'lodash',
    'util/validators/textinputValidators'
], function(
    _,
    textInputValidators
) {
    'use strict';

    return _.merge({}, textInputValidators);
});
