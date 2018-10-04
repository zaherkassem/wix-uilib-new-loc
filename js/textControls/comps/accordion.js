define(['react', 'lodash', 'textControls/comps/accordion.rt', 'util'], function (React, _, template, util) {
    'use strict';

    return React.createClass({
        displayName: 'accordion',
        mixins: [util.translationMixin],
        propTypes: {
            label: React.PropTypes.string,
            isOptionSelected: React.PropTypes.bool,
            infoText: React.PropTypes.string,
            infoTitle: React.PropTypes.string,
            isOpenedOnInit: React.PropTypes.bool
        },
        getInitialState: function () {
            return {
                opened: this.props.isOpenedOnInit || false
            };
        },
        render: template,
        getLabel: function () {
            return this.props.label !== undefined ? this.props.label : '';
        },
        toggle: function () {
            this.setState({opened: !this.state.opened});

        }
    });
});
