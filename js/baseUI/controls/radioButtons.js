define(['react', 'lodash', 'baseUI/controls/radioButtonsMixin', 'baseUI/controls/radioButtons.rt'],
    function (React, _, radioMixin, template) {
        'use strict';

        return React.createClass({
            displayName: 'RadioButtons',
            mixins: [radioMixin],
            propTypes: {
                label: React.PropTypes.string,
                disabled: React.PropTypes.bool,
                options: React.PropTypes.arrayOf(React.PropTypes.shape({
                    value: React.PropTypes.string.isRequired,
                    label: React.PropTypes.string.isRequired,
                    className: React.PropTypes.string,
                    type: React.PropTypes.string
                })),
                infoText: React.PropTypes.string,
                infoTitle: React.PropTypes.string
            },
            onClick: function () {
                if (this.props && this.props.onClickPreview) {
                    this.props.onClickPreview(this.props);
                }
            },
            onMouseOver: function () {
                if (this.props && this.props.onMouseOverPreview) {
                    this.props.onMouseOverPreview(this.props);
                }
            },
            render: template
        });
    });