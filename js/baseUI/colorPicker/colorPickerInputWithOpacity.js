define([
    'react',
    'lodash',
    'util',
    'baseUI/colorPicker/colorPickerInputWithOpacity.rt'
], function (React, _, util, template) {
    'use strict';

    return React.createClass({
        propTypes: {
            label: React.PropTypes.string,
            isSmallStepper: React.PropTypes.bool
        },
        getDefaultProps: function () {
            return {
                isSmallStepper: false
            };
        },
        mixins: [util.valueLinkMixin, util.propTypesFilterMixin, util.translationMixin],
        displayName: 'colorPickerInputWithOpacity',
        linkColor: function(){
            return {
                value: this.getValueFromProps().color,
                requestChange: function(color){
                    this.callOnChangeIfExists({color: color, alpha: this.getValueFromProps().alpha});
                }.bind(this)
            };
        },
        linkOpacity: function(){
            return {
                value: this.getValueFromProps().alpha * 100,
                requestChange: function(alpha){
                    this.callOnChangeIfExists({color: this.getValueFromProps().color, alpha: alpha / 100});
                    if(this.props.onChange) {
                        this.props.onChange({color: this.getValueFromProps().color, alpha: alpha / 100});
                    }
                }.bind(this)
            };
        },
        getPropsForColorInput: function(){
            var props = this.filteredProps();
            props.opacity = this.getValueFromProps().alpha;
            return props;
        },
        render: template
    });
});
