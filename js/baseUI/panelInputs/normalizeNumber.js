define([], function () {
    'use strict';

    function alignNumberToStep(num, step) {
        if (num % step) {
            num = Math.round(num / step) * step;
        }
        return num;
    }

    function fixNotANumber(num) {
        if (isNaN(num)) {
            num = 0;
        }
        return num;
    }

    function validateBoundaries(num, min, max) {
        if (num > max) {
            num = max;
        } else if (num < min) {
            num = min;
        }
        return num;
    }

    function limitDecimalPoint(num) {
        if (num !== Math.round(num)) {
            num = num.toFixed(2);

            if (num.charAt(num.length - 1) === '0') {
                num = num.slice(0, num.length - 1);
            }
        }
        return Number(num);
    }

    function normalizeNumber(value, min, max, step) {
        if (value === '') {
            return min;
        }
        var num = Number(value);
        num = fixNotANumber(num);
        num = alignNumberToStep(num, step);
        num = validateBoundaries(num, min, max);
        num = limitDecimalPoint(num);
        return num;
    }

    return normalizeNumber;
});
