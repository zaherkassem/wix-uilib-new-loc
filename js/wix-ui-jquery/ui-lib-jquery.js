require('cssCollector');
require('wix-ui-jquery/button/button');
require('wix-ui-jquery/slider/slider');
require('wix-ui-jquery/stepper/stepper');
require('wix-ui-jquery/switches/toggle');
require('wix-ui-jquery/switches/checkbox');
require('wix-ui-jquery/switches/radioButtons');
require('wix-ui-jquery/switches/toggleButtonsGroup');
require('wix-ui-jquery/switches/buttonsGroup');
require('wix-ui-jquery/alignment/dock');
require('wix-ui-jquery/core/core');
require('wix-ui-jquery/core/definePlugin');
require('wix-ui-jquery/tabs/tabs');
require('wix-ui-jquery/textInput/textInput');
require('wix-ui-jquery/dropDown/dropDown');
require('wix-ui-jquery/colorPicker/colorPickerSlider');
require('wix-ui-jquery/colorPicker/colorPickerInput');
require('wix-ui-jquery/fontPicker/fontPicker');
require('wix-ui-jquery/fontAndColorPicker/fontAndColorPicker');
require('wix-ui-jquery/languagePicker/languagePicker');
require('wix-ui-jquery/sectionDividerLabeled/sectionDividerLabeled');
require('wix-ui-jquery/teaserPopup/teaserPopup');
require('wix-ui-jquery/textInputWithButton/textInputWithButton');
require('wix-ui-jquery/preloader');
require('wix-ui-jquery/symbol/symbol');
require('wix-ui-jquery/imagePreview/imagePreview');
require('wix-ui-jquery/panelTabs/panelTabs');
require('wix-ui-jquery/panelTabs/appSettings');
require('wix-ui-jquery/tooltip/tooltip');
require('wix-ui-jquery/thumbnails/thumbnails');


$(document).ready(function(){
    Wix.UI && Wix.UI.initialize({});
});
