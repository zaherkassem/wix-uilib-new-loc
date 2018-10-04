define(['react', 'lodash', 'util', 'baseUI/mixins/reportUIChangeMixin', 'baseUI/panelInputs/videoChange.rt'], function (React, _, util, reportUIChangeMixin, template) {
    'use strict';

    // TODO: add tests

    var VIDEO_SEARCH_PANEL_NAME = 'panels.focusPanels.videoSearchPanel';

    var VALUE_PROP_SHAPE = React.PropTypes.shape({
        videoType: React.PropTypes.string.isRequired,
        videoId: React.PropTypes.string.isRequired
    });

    return React.createClass({
        displayName: 'videoChange',
        mixins: [util.valueLinkMixin, util.propTypesFilterMixin, reportUIChangeMixin],
        propTypes: {
            panelManager: React.PropTypes.object.isRequired,
            nonEmptyButtonLabel: React.PropTypes.string.isRequired,
            emptyButtonLabel: React.PropTypes.string.isRequired,
            searchable: React.PropTypes.bool,
            value: VALUE_PROP_SHAPE,
            valueLink: React.PropTypes.shape({
                value: VALUE_PROP_SHAPE,
                requestChange: React.PropTypes.func
            })
        },
        YOUTUBE_URL: '//www.youtube.com/embed/',
        VIMEO_URL: '//player.vimeo.com/video/',
        getInitialState: function() {
            return {
                videoId: '',
                videoType: '',
                isPlaying: false,
                isMouseHovering: false
            };
        },
        getDefaultProps: function () {
            return {
                searchable: true
            };
        },
        _setVideoFromProps: function(props) {
            var videoData = this.getValueFromProps(props);
            this.setState({videoId: videoData.videoId, videoType: videoData.videoType});
        },
        _onVideoSelected: function(newVideoId) {
            this.props.panelManager.closePanelByName(VIDEO_SEARCH_PANEL_NAME);
            var newVideoData = {videoType: 'YOUTUBE', videoId: newVideoId};
            this.setState(newVideoData);
            this.callOnChangeIfExists(newVideoData);
            this.reportUIChange({value: newVideoData});
        },
        getButtonLabel: function() {
            return this.isEmpty() ? this.props.emptyButtonLabel : this.props.nonEmptyButtonLabel;
        },
        componentDidMount: function() {
            this._setVideoFromProps(this.props);
        },
        componentWillReceiveProps: function(nextProps) {
            if (!_.isEqual(nextProps, this.props)) {
                this._setVideoFromProps(nextProps);
            }
        },
        openVideoSearchPanel: function() {
            this.props.panelManager.openPanel(VIDEO_SEARCH_PANEL_NAME, {
                onVideoSelected: this._onVideoSelected
            }, true);
        },
        getVideoSrc: function() {
            if (this.state.videoId) {
                var baseURL = this.state.videoType === 'YOUTUBE' ? this.YOUTUBE_URL : this.VIMEO_URL;
                return baseURL + this.state.videoId + '?' + this.getVideoPresets();
            }
            return '';
        },
        getVideoPresets: function() {
            return _.map({
                wmode: 'transparent',
                autoplay: this.state.isPlaying ? '1' : '0',
                theme: 'light',
                controls: '0',
                autohide: '0',
                loop: '1',
                showinfo: '0'
            }, function(val, key) {
                return key + '=' + val;
            }).join('&');
        },
        playVideo: function() {
            if (this.state.videoId) {
                this.setState({isPlaying: true});
            }
        },
        pauseVideo: function() {
            if (this.state.isPlaying) {
                this.setState({isPlaying: false});
            }
        },
        isEmpty: function() {
            return _.isEmpty(this.state.videoId);
        },
        blockEvent: function(e) {
            if (e) {
                e.preventDefault();
            }
        },
        render: template
    });
});
