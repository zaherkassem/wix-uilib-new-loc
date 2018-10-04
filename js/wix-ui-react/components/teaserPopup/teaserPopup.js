var template = require('wix-ui-react/components/teaserPopup/teaserPopup.rt');
require("baseUI/panelInputs/firstTimeInfoBox.scss");
var _ = require('lodash');

module.exports = React.createClass({
    displayName: 'TeaserPopup',
    propTypes: {
        text: React.PropTypes.string,
        title: React.PropTypes.string,
        linkText: React.PropTypes.string,
        gotItText: React.PropTypes.string,
        linkClicked: React.PropTypes.func,
        onClose: React.PropTypes.func
    },
    getDefaultProps: function () {
      return {
          id: 'hardcoded_id', // id is a required property in the editor.
          linkText: 'Learn more',
          gotItText: 'Got it'
      };
    },
    userPrefs: function () {
        return {
            site: {
                get: function () { return false; },
                set: _.noop
            }
        };

    },
    biClose: function () {
        if (_.isFunction(this.props.onClose)) {
            this.props.onClose();
        }
    },
    biLearnMore: _.noop,

    render: template
});
