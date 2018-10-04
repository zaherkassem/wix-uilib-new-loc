define(['lodash', 'baseUI/panelInputs/inputMixin'], function (_, inputMixin) {
    'use strict';

    return _.extend({}, inputMixin, {
        componentWillReceiveProps: function (nextProps) {
            var newVal = this.getValueFromProps(nextProps);
            if (this.getValueFromProps(this.props) !== newVal) {
                this.setState({value: newVal});
            }
        }
    });
});
