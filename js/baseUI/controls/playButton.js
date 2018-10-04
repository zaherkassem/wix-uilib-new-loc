define(['react', 'lodash', 'baseUI/controls/playButton.rt'], function (React, _, template) {
    'use strict';

    return React.createClass({
        displayName: 'playBtn',
        render: template,
        getInitialState: function () {
            return {
                isPlaying: false
            };
        },
        onPlayButtonClick: function () {
            this.setState({isPlaying: true});
            if (this.props.onClickAction) {
                this.props.onClickAction(this.onPlayingDone);
            }
        },
        onPlayingDone: function () {
            this.setState({isPlaying: false});
        }
    });
});
