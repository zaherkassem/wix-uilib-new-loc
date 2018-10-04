define(['react', 'lodash', 'baseUI/panelInputs/inputMixin', 'util', 'baseUI/controls/button2.rt'], function (React, _, inputMixin, util, template) {
    'use strict';

    return React.createClass({
        displayName: 'Button2',
        mixins: [inputMixin, util.translationMixin],
        propTypes: {
            label: React.PropTypes.string,
            className: React.PropTypes.string,
            wrapperClass: React.PropTypes.string,
            wrapperStyle: React.PropTypes.object,
            disabled: React.PropTypes.bool,
            symbolName: React.PropTypes.string
        },
        getWrapperProps: function (defaultProps) {
            var props = {};
            _.assign(props, defaultProps);

            if (!_.isEmpty(this.props.wrapperClass)) {
                props.class = _.compact([props.class, this.props.wrapperClass].join(' '));
            }
            if (!_.isEmpty(this.props.wrapperStyle)) {
                props.style = this.props.wrapperStyle;
            }

            return props;
        },
        render: template
    });
});
