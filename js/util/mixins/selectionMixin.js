define(['lodash'], function (_) {
    'use strict';

    return {
        getInitialState: function () {
            return {checkedItems: {}};
        },

        clearSelection: function () {
            this.setState({checkedItems: {}});
        },

        toggle: function (id) {
            var checkedItems = this.state.checkedItems;
            checkedItems[id] = !checkedItems[id];
            this.setState({checkedItems: checkedItems});
        },

        toggleAll: function (allIds) {
            if (this.getSelectedIds().length === 0) {
                var checkedItems = _.transform(allIds, function (acc, id) {
                    acc[id] = true;
                }, {});
                this.setState({checkedItems: checkedItems});
            } else {
                this.setState({checkedItems: {}});
            }
        },

        isSelected: function (id) {
            return !!this.state.checkedItems[id];
        },

        getSelectedIds: function () {
            return _(this.state.checkedItems)
                .pick(function (val) {
                    return val;
                })
                .keys()
                .value();
        }
    };
});