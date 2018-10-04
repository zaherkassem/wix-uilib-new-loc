/**
 * Created by eitanr on 2/3/15.
 */
define(['react', 'lodash', 'baseUI/panelInputs/inputMixin', 'baseUI/mixins/reportUIChangeMixin', 'util'], function (React, _, inputMixin, reportUIChangeMixin, util) {
    'use strict';

    var translationMixin = util.translationMixin;
    var seq = 0;

    return {
        propTypes: {
            options: React.PropTypes.arrayOf(React.PropTypes.shape({
                value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.bool]).isRequired,
                className: React.PropTypes.string
            }))
        },
        mixins: [inputMixin, reportUIChangeMixin, translationMixin],

        getRadioGroupId: function () {
            if (!this.groupId) {
                this.groupId = 'rb_' + seq++;
            }
            return this.groupId;
        },

        handleChange: function (newSelectedValue, newSelectedType) {
            this.callOnChangeIfExists(newSelectedValue, newSelectedType);
            this.reportUIChange({value: newSelectedValue});
        }
    };
});