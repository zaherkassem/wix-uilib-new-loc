var React = require('react');
var template = require('wix-ui-react/components/colorSpace/paletteDisplayer.rt');
require('baseUI/colorPicker/palettesList.scss');
require('baseUI/colorPicker/paletteDisplayer.scss');

module.exports = React.createClass({

    displayName: 'paletteDisplayer',
    mixins: [React.addons.LinkedStateMixin],
    propTypes: {
        label: React.PropTypes.string,
        defaultValue: React.PropTypes.bool,
        onChange: React.PropTypes.func,
        onClick: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            openColorPicker: this.handleClick
        };
    },

    getThemeColors: function() {
        if (this.props.palette) {
            return this.props.palette;
        }
        return {
            color_0: '#ffffff',
            color_1: '#FFFFFF',
            color_2: '#000000',
            color_3: '237,28,36,1',
            color_4: '0,136,203,1',
            color_5: '255,203,5,1',
            color_6: '114,114,114,1',
            color_7: '176,176,176,1',
            color_8: '255,255,255,1',
            color_9: '114,114,114,1',
            color_10: '176,176,176,1',
            color_11: '#FFFFFF',
            color_12: '#CCCCCC',
            color_13: '#A0A09F',
            color_14: '#605E5E',
            color_15: '#2F2E2E',
            color_16: '#BAE9FF',
            color_17: '#97DEFF',
            color_18: '#30BDFF',
            color_19: '#207EA9',
            color_20: '#103F54',
            color_21: '#B6E8E3',
            color_22: '#8DD1CA',
            color_23: '#41BAAE',
            color_24: '#2B7C74',
            color_25: '#163E3A',
            color_26: '#F4C0AF',
            color_27: '#E99F86',
            color_28: '#DE5021',
            color_29: '#943616',
            color_30: '#4A1B0B',
            color_31: '#F4EAB1',
            color_32: '#E9DB89',
            color_33: '#DEC328',
            color_34: '#94821B',
            color_35: '#4A410D'
        };
    },


    render: template
});