define(['react', 'lodash', 'core', 'util', 'baseUI/panelInputs/media/videoInput.rt'], function (React, _, core, util, template) {
    'use strict';

    var VIDEO_SEARCH_PANEL_NAME = 'panels.focusPanels.videoSearchPanel';
    var VIDEO_TYPE_TO_BASE_URL = {
        YOUTUBE: '//www.youtube.com/embed/',
        VIMEO: '//player.vimeo.com/video/'
    };

    var VALUE_PROP_SHAPE = React.PropTypes.shape({
        videoType: React.PropTypes.string.isRequired,
        videoId: React.PropTypes.string.isRequired
    });


    function getVideoUrl(videoData) {
        var videoUrl = VIDEO_TYPE_TO_BASE_URL[videoData.videoType] + videoData.videoId;
        if (videoData.videoType === 'YOUTUBE') {
            var params = _.map({
                wmode: 'transparent',
                theme: 'light',
                controls: '0',
                autohide: '0',
                loop: '1',
                showinfo: '0'
            }, function (val, key) {
                return key + '=' + val;
            }).join('&');
            return videoUrl + '?' + params;
        }
        return videoUrl;
    }

    return React.createClass({
        displayName: 'videoInput',
        mixins: [core.mixins.editorAPIMixin, util.propTypesFilterMixin, util.valueLinkMixin],
        propTypes: {
            panelManager: React.PropTypes.object.isRequired,
            nonEmptyButtonLabel: React.PropTypes.string.isRequired,
            emptyButtonLabel: React.PropTypes.string.isRequired,
            value: VALUE_PROP_SHAPE,
            valueLink: React.PropTypes.shape({
                value: VALUE_PROP_SHAPE,
                requestChange: React.PropTypes.func
            })
        },
        getInitialState: function () {
            return {
                isPlaying: false,
                isMouseHovering: false
            };
        },

        getButton: function () {
            return {
                nonEmptyButtonLabel: this.props.nonEmptyButtonLabel,
                nonEmptyButtonIcon: 'magnifyingGlass',
                emptyButtonLabel: this.props.emptyButtonLabel,
                emptyButtonIcon: 'magnifyingGlass',
                onClick: this._openVideoSearchPanel
            };
        },

        getButtonIcon: function (button) {
            return this.isEmpty() ? button.emptyButtonIcon : button.nonEmptyButtonIcon;
        },

        getButtonLabel: function (button) {
            return this.isEmpty() ? button.emptyButtonLabel : button.nonEmptyButtonLabel;
        },

        _onVideoSelected: function (doneCB, newVideoId) {
            this.props.panelManager.closePanelByName(VIDEO_SEARCH_PANEL_NAME);
            doneCB({
                videoType: 'YOUTUBE', videoId: newVideoId
            });
        },

        _openVideoSearchPanel: function (doneCB) {
            this.props.panelManager.openPanel(VIDEO_SEARCH_PANEL_NAME, {
                onVideoSelected: this._onVideoSelected.bind(this, doneCB)
            }, true);
        },

        getURL: function () {
            var videoData = this.getValueFromProps();
            if (videoData && videoData.videoId) {
                var videoUrl = getVideoUrl(videoData);
                videoUrl = videoUrl + (_.includes(videoUrl, '?') ? '&' : '?');
                return videoUrl + 'autoplay=' + (this.state.isPlaying ? '1' : '0');
            }
            return null;
        },

        isEmpty: function () {
            var videoData = this.getValueFromProps();
            return !(videoData && videoData.videoId);
        },

        playVideo: function () {
            this.setState({isPlaying: true});
        },

        pauseVideo: function () {
            this.setState({isPlaying: false});
        },

        onClick: function (button) {
            button.onClick(this.callOnChangeIfExists);
        },

        onMouseEnter: function (){
            this.setState({'isMouseHovering': true});
        },

        onMouseLeave: function() {
            this.setState({'isMouseHovering': false});
        },

        render: template
    });
});
