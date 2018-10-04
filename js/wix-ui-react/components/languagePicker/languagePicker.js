var React = require('react');
var _ = require('lodash');
var dropDown = require("wix-ui-react/components/dropDown/dropDown");
require("baseUI/panelInputs/dropDown/dropDown.scss");

module.exports = React.createClass({

    displayName: 'languagePicker',
    mixins: [React.addons.LinkedStateMixin],
    getInitialState: function() {
        return {
            languages: [
                {symbol: 'En', native: 'English'},
                {symbol: 'Da', native: 'Dansk'},
                {symbol: 'De', native: 'Deutsch'},
                {symbol: 'Es', native: 'Español'},
                {symbol: 'Fr', native: 'Français'},
                {symbol: 'It', native: 'Italiano'},
                {symbol: 'Nl', native: 'Nederlands'},
                {symbol: 'No', native: 'Norsk'},
                {symbol: 'Pl', native: 'Polski'},
                {symbol: 'Pt', native: 'Português'},
                {symbol: 'Ru', native: 'Русский'},
                {symbol: 'Sv', native: 'Svenska'},
                {symbol: 'Ja', native: '日本語'},
                {symbol: 'Ko', native: '한국어'},
                {symbol: 'Tr', native: 'Türkçe'},
                {symbol: 'He', native: 'עברית'}
            ],
            defaultValue: 'En'
        };
    },

    render: function () {
        function repeatLangs(lang) {
            return React.createElement(dropDown.option, {value: lang}, lang.native);
        }
        var defaultLang = _.find(this.state.languages, {'symbol' : this.props.defaultValue});

        return React.createElement(dropDown.select, {
                'value': defaultLang,
                'valueLink': this.props.valueLink,
                'onChange': this.props.onChange,
                'label': this.props.title,
                'customDropDownIcon': 'arrowDown', // TODO: use a world icon or something
                'infoTitle': this.props.infoTitle,
                'infoText': this.props.infoText || 'here you can select language'

            }, _.map(this.state.languages, repeatLangs.bind(this)));
    }
});
