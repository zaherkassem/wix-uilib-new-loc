define(['lodash'], function(_){
    'use strict';

    function valueFromPercent(percent, min, max) {
        if (percent > 100 || percent < 0 || max < min) {
            console.error('percent is invalid of range or range error');
            return null;
        }
        return min + (max - min) * percent / 100;
    }

    function percentFromValue(value, min, max) {
        if (value > max || value < min || max < min) {
            console.error('value is out of range or range error');
            return null;
        }
        var range = max - min;
        return 100 * (value - min) / range;
    }

    function ensureWithinLimits(value, min, max){
        min = _.isUndefined(min) ? value : min;
        max = _.isUndefined(max) ? value : max;

        if (min > max) {
            max = min + 100;
        }
        //if (min > max){
        //    throw 'min limit is greater than max limit';
        //}

        if (value < min) {
            return min;
        }
        if (value > max){
            return max;
        }

        return value;
    }

    return {
        valueFromPercent: valueFromPercent,
        percentFromValue: percentFromValue,
        ensureWithinLimits: ensureWithinLimits
    };
});