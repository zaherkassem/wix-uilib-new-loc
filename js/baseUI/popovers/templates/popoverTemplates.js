define([
    'baseUI/popovers/templates/imageAndTextTooltip/imageAndTextTooltip',
    'baseUI/popovers/templates/titleBodyAndLinkTooltip/titleBodyAndLinkTooltip',
    'baseUI/popovers/templates/keyboardShortcutTooltip/keyboardShortcutTooltip'
], function (
    imageAndTextTooltip,
    titleBodyAndLinkTooltip,
    keyboardShortcutTooltip
    ) {
    'use strict';

    return {
        imageAndTextTooltip: imageAndTextTooltip,
        titleBodyAndLinkTooltip: titleBodyAndLinkTooltip,
        keyboardShortcutTooltip: keyboardShortcutTooltip
    };
});