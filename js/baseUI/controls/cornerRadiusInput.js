define(['react', 'lodash', 'util', 'baseUI/controls/cornerRadiusInput.rt', 'baseUI/panelInputs/inputMixin', 'baseUI/mixins/reportUIChangeMixin'], function (React, _, util, template, inputMixin, reportUIChangeMixin) {
    'use strict';

    var CORNERS_INDEX = {
        'top_left': 0,
        'top_right': 1,
        'bottom_right': 2,
        'bottom_left': 3
    };

    function changeCorner(corner, val) {
        var newCornerValues = getCornersArray(this.getValueFromProps());
        newCornerValues[CORNERS_INDEX[corner]] = val;

        this.handleChange(newCornerValues);
    }

    function getCornersArray(val) {
        return _.map(val.split(' '), function (cornerVal) {
            return parseInt(cornerVal, 10);
        });
    }

    function isLinked(val) {
        return val.split && val.split(' ').length === 1;
    }

    return React.createClass({
        displayName: 'cornerRadiusInput',
        mixins: [inputMixin, reportUIChangeMixin, React.addons.LinkedStateMixin, util.translationMixin],
        render: template,
        getDefaultProps: function() {
            return {
                minBorderValue: 0,
                maxBorderValue: 9999,
                borderStep: 1
            };
        },

        onCornerChange: function (corner, newVal) {
            if (isLinked(this.getValueFromProps())) {
                this.changeAllCorners(newVal);
            } else {
                changeCorner.call(this, corner, newVal);
            }
        },

        changeAllCorners: function (newVal) {
            this.handleChange(newVal);
        },

        getCornerValue: function (corner) {
            var val = this.getValueFromProps();
            if (isLinked(val)) {
                return parseInt(val, 10);
            }
            var corners = getCornersArray(val);
            return corners[CORNERS_INDEX[corner]];
        },

        getLinkedToggleValue: function () {
            return isLinked(this.getValueFromProps());
        },

        toggleLink: function () {
            var currVal = this.getValueFromProps();
            var corners = getCornersArray(currVal);
            if (isLinked(currVal)) {
                corners.push(corners[0], corners[0], corners[0]);
            } else {
                corners = corners[0];
            }
            this.handleChange(corners);
        },

        handleChange: function (newVal) {
            var newValueWithUnits = _.isArray(newVal) ? newVal.join('px ') + 'px' : newVal + 'px';
            this.callOnChangeIfExists(newValueWithUnits);
            this.reportUIChange({value: newValueWithUnits});
        }
    });
});
