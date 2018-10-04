define(['react', 'baseUI/panelInputs/inputMixin', 'util', 'baseUI/mixins/reportUIChangeMixin'],
    function (React, inputMixin, util, reportUIChangeMixin) {
        'use strict';

        var translationMixin = util.translationMixin;

        return {
            mixins: [inputMixin, reportUIChangeMixin, translationMixin],
            contextTypes: {
                reportUIChange: React.PropTypes.func
            },
            handleChange: function () {
                var newVal = !this.getValueFromProps(this.props);
                this.reportUIChange({value: newVal});
                this.callOnChangeIfExists(newVal);
            }
        };
    });
