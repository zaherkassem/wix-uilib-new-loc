define(['react-dom', 'react', 'lodash', 'baseUI/panelInputs/firstTimeInfoBox.rt'], function(ReactDOM, React, _, template) {
    'use strict';

    return React.createClass({
        displayName: 'firstTimeInfoBox',
        getInitialState: function () {
            return {
                close: false
            };
        },
        propTypes: {
            id: React.PropTypes.string.isRequired,
            text: React.PropTypes.string.isRequired,
            hide: React.PropTypes.bool,
            title: React.PropTypes.string,
            linkText: React.PropTypes.string,
            image: React.PropTypes.string,
            video: React.PropTypes.string,
            context: React.PropTypes.oneOf(['header', 'section', 'settings', 'left-panel', 'pages-panel']),
            userPrefs: React.PropTypes.object.isRequired,
            onFirstTimeInfoBoxHeightChange: React.PropTypes.func,
            biLearnMore: React.PropTypes.func.isRequired,
            learnMore: React.PropTypes.func,
            biClose: React.PropTypes.func.isRequired
        },
        getDefaultProps: function () {
            return {
                context: 'header',
                hide: false
            };
        },
        componentDidMount: function () {
            if (this.props.onFirstTimeInfoBoxHeightChange) {
                this.props.onFirstTimeInfoBoxHeightChange(ReactDOM.findDOMNode(this) ? ReactDOM.findDOMNode(this).offsetHeight : 0);
            }
        },
        shouldComponentUpdate: function (nextProps, nextState) {
            return !(_.isEqual(this.props, nextProps) && _.isEqual(this.state, nextState));
        },
        shouldShowTeaser: function () {
            return !this.props.userPrefs.site.get('closed_teaser_' + this.props.id);
        },
        close: function () {
            this.props.userPrefs.site.set('closed_teaser_' + this.props.id, true);
            ReactDOM.findDOMNode(this).style.display = 'none';
            this.setState({close: true});
            if (this.props.onFirstTimeInfoBoxHeightChange) {
                this.props.onFirstTimeInfoBoxHeightChange();
            }
            this.props.biClose({panel_name: this.props.id});
        },
        link: function () {
            if (this.props.learnMore) {
                this.props.learnMore();
                this.props.biLearnMore({panel_name: this.props.id});
            }
        },
        render: template
    });
});
