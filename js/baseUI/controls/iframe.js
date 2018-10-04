define(['react', 'lodash', 'baseUI/controls/iframe.rt', 'util'], function (React, _, template, util) {
    'use strict';

    return React.createClass({
        displayName: 'IFrame',
        render: template,
        mixins: [util.propTypesFilterMixin],
        propTypes: {
            src: React.PropTypes.string.isRequired,
            onPostMessage: React.PropTypes.func
        },
        _postMessageHandler: function(evt) {
            if (this.props.onPostMessage && this.props.src.indexOf(evt.origin) === 0) {
                this.props.onPostMessage(evt);
            }
        },
        componentWillMount: function () {
            window.addEventListener('message', this._postMessageHandler);
            this.name = _.uniqueId('iframe');
        },
        componentWillUnmount: function() {
            window.removeEventListener('message', this._postMessageHandler);
        },
        sendMessage: function(data) {
            window.frames[this.name].postMessage(data, this.props.src);
        }
    });
});
