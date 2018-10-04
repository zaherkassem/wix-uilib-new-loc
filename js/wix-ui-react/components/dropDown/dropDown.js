var dropDownOption = require('baseUI/panelInputs/dropDown/option');
var dropDownOptions = require('baseUI/panelInputs/dropDown/options');
var dropDownSelect = require('baseUI/panelInputs/dropDown/select');

require("baseUI/panelInputs/dropDown/dropDown.scss");

module.exports = {
    select: dropDownSelect,
    option: dropDownOption,
    options: dropDownOptions
};