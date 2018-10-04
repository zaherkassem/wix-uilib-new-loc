var tabHolder = require('baseUI/tabs/tabHolder');
var tabLabel = require('baseUI/tabs/tabLabel');
var tabHeader = require('baseUI/tabs/tabHeader');
var tabContent = require('baseUI/tabs/tabContent');
var tab = require('baseUI/tabs/tab');
require('wix-ui-react/components/tabs/tabs-ui-lib.scss');

module.exports = {
    holder: tabHolder,
    header: tabHeader,
    label: tabLabel,
    content: tabContent,
    tab: tab
};