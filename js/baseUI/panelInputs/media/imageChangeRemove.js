define(['react', 'lodash', 'core', 'util', 'baseUI/panelInputs/media/imageChangeRemove.rt'], function (React, _, core, util, template) {
    'use strict';

    return React.createClass({
        displayName: 'imageChangeRemove',
        mixins: [core.mixins.editorAPIMixin, util.propTypesFilterMixin, util.valueLinkMixin],
        propTypes: {
            removeButtonLabel: React.PropTypes.string
        },
        getRemoveButton: function () {
            if ((this.getValueFromProps() || {}).uri) {
                return {
                    nonEmptyButtonLabel: this.props.removeButtonLabel,
                    nonEmptyButtonIcon: 'delete',
                    onClick: this._removeImage
                };
            }
        },
        _removeImage: function (doneCB) {
            doneCB(null);
        },
        render: template
    });
});
