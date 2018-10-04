define(['react', 'lodash', 'baseUI/panelInputs/inputMixin', 'util', 'baseUI/panelInputs/radioGroup.rt'],
    function (React, _, inputMixin, util, template) {
        'use strict';

        var seq = 0;

        return React.createClass({
            displayName: 'RadioGroup',
            propTypes: {
                options: React.PropTypes.arrayOf(React.PropTypes.shape({
                    label: React.PropTypes.string.isRequired,
                    value: React.PropTypes.string.isRequired
                }))
            },
            mixins: [inputMixin, util.translationMixin],

            getRadioGroupId: function() {
                if (!this.groupId) {
                    this.groupId = 'rg_' + seq++;
                }
                return this.groupId;
            },

            handleChange: function (newSelectedValue) {
                this.callOnChangeIfExists(newSelectedValue);
            },

            handleOnMouseOver: function (newSelectedValue) {
                if (!_.has(this.props, 'onMouseOver')) {
                    return;
                }
                this.props.onMouseOver(newSelectedValue);
            },

            handleOnRadioSelect: function (newSelectedValue) {
                if (!_.has(this.props, 'onRadioSelect')) {
                    return;
                }
                this.props.onRadioSelect(newSelectedValue);
            },

            render: template
        });
    });
