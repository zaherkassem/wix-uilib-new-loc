var symbols = require('symbols');
var dock = require('wix-ui-react/components/alignment/dock');
var buttonsGroup = require('wix-ui-react/components/switches/buttonsGroup');
var button = require('wix-ui-react/components/button/button');
var colorPickerSlider = require('wix-ui-react/components/colorSpace/colorPickerSlider');
var colorPickerInput = require('wix-ui-react/components/colorSpace/colorPickerInput');
var checkbox = require('wix-ui-react/components/switches/checkbox');
var dropDown = require('wix-ui-react/components/dropDown/dropDown');
var dropDownSelect = require('wix-ui-react/components/dropDown/dropDownSelect');
var radioButtons = require('wix-ui-react/components/switches/radioButtons');
var tooltip = require('wix-ui-react/components/tooltip/tooltip');
var openedPanels = require('wix-ui-react/components/panels/openedPanels');
var languagePicker = require('wix-ui-react/components/languagePicker/languagePicker');
var slider = require('wix-ui-react/components/slider/slider');
var stepper = require('wix-ui-react/components/stepper/stepper');
var tabs = require('wix-ui-react/components/tabs/tabs');
var textInput = require('wix-ui-react/components/textInput/textInput');
var toggle = require('wix-ui-react/components/switches/toggle');
var toggleButtonsGroup = require('wix-ui-react/components/switches/toggleButtonsGroup');
var paletteDisplayer = require('wix-ui-react/components/colorSpace/paletteDisplayer');
var fontPicker = require('wix-ui-react/components/fontPicker/fontPicker');
var sectionDividerLabeled = require('wix-ui-react/components/sectionDividerLabeled/sectionDividerLabeled');
var teaserPopup = require('wix-ui-react/components/teaserPopup/teaserPopup');
var textInputWithButton = require('wix-ui-react/components/textInputWithButton/textInputWithButton');
var preloader = require('wix-ui-react/components/preloader');
var imagePreview = require('wix-ui-react/components/imagePreview/imagePreview');
var panelTabs = require('wix-ui-react/components/panelTabs/tabs');
var appSettings = require('wix-ui-react/appSettings/appSettings');
var fontAndColorPicker = require('wix-ui-react/components/fontAndColorPicker/fontAndColorPicker');
var thumbnails = require('wix-ui-react/components/thumbnails/thumbnails.js');


require('cssCollector');

module.exports = {
    symbol: symbols.symbol,
    checkbox: checkbox,
    dock: dock,
    radioButtons: radioButtons,
    tabs: tabs,
    slider: slider,
    stepper: stepper,
    dropDown: dropDown,
    dropDownSelect: dropDownSelect,
    colorPickerSlider: colorPickerSlider,
    colorPickerInput: colorPickerInput,
    button: button,
    tooltip: tooltip,
    toggleSwitch: toggle,
    toggleButtons: buttonsGroup,
    OpenedPanels: openedPanels,
    languagePicker: languagePicker,
    toggleButtonsGroup: toggleButtonsGroup,
    textInput: textInput,
    paletteDisplayer: paletteDisplayer,
    fontPicker: fontPicker,
    fontAndColorPicker: fontAndColorPicker,
    sectionDividerLabeled: sectionDividerLabeled,
    teaserPopup: teaserPopup,
    textInputWithButton: textInputWithButton,
    preloader: preloader,
    imagePreview: imagePreview,
    panelTabs: panelTabs,
    appSettings: appSettings,
    thumbnails: thumbnails
};
