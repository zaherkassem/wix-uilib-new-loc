define([
    'util/utils/classNames',
    'util/props/propTypesFilterMixin',
    'util/mixins/valueLinkMixin',
    'util/mixins/singlePassDOMReadWriteMixin',
    'util/mixins/blockOuterScrollMixin',
    'util/mixins/outerClickMixin',
    'util/math/math',
    'util/keyboardShortcuts/keyboardShortcuts',
    'overrides/utils'
], function
    (classNameUtils,
     propTypesFilterMixin,
     valueLinkMixin,
     singlePassDOMReadWriteMixin,
     blockOuterScrollMixin,
     outerClickMixin,
     math,
     keyboardShortcuts,
     utils) {

    return {
        inheritClassName: classNameUtils.inheritClassName,
        propTypesFilterMixin: propTypesFilterMixin,
        valueLinkMixin: valueLinkMixin,
        translationMixin: utils.translationMixin,
        media: utils.media,
        keyboardShortcuts: keyboardShortcuts,
        translate: function(text){ return text;},
        singlePassDOMReadWriteMixin: singlePassDOMReadWriteMixin,
        blockOuterScrollMixin: blockOuterScrollMixin,
        outerClickMixin: outerClickMixin,
        math: math
    };
});
