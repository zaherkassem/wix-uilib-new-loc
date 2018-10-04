define(['react', 'lodash', 'baseUI/controls/toggleMixin', 'baseUI/controls/toggle.rt'], function (React, _, booleanMixin, template) {
    'use strict';

    return React.createClass({
        displayName: 'boolean',
        propTypes: {
            name: React.PropTypes.string,
            label: React.PropTypes.oneOfType([
                React.PropTypes.string,
                React.PropTypes.element]),
            infoText: React.PropTypes.string,
            infoTitle: React.PropTypes.string,
            shouldDisplayInfoIcon: React.PropTypes.bool,
            infoAlignment: React.PropTypes.string,
            infoFitToBounds: React.PropTypes.bool,
            disabled: React.PropTypes.bool,
            labelAfterSymbol: React.PropTypes.bool,
            shouldTranslate: React.PropTypes.bool,
            size: React.PropTypes.string
        },
        mixins: [booleanMixin],
        getDefaultProps: function () {
            return {
                name: 'switch'
            };
        },
        getClasses: function () {

            var classes = {
                'boolean-control': true
            };

            classes[this.getClassName('control-' + this.props.name)] = true;
            classes[this.getSizeClass()] = true;

            return classes;
        },
        getSizeClass: function () {
            if (this.props.size === 'medium') {
                return 'medium-scale';
            }
            return 'no-scale';
        },
        render: template
    });
});
