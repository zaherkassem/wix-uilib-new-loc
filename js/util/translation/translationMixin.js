define(['util/translation/translate', 'react', 'lodash', 'util/bi/bi'], function (translate, React, _, bi) {
    'use strict';

    return {
        propTypes: {
            shouldTranslate: React.PropTypes.bool
        },
        getDefaultProps: function () {
            return {
                shouldTranslate: true
            };
        },
        translateIfNeeded: function (key) {
            return this.props.shouldTranslate ? translate(key) : key;
        },
        translateTemplate: function (key, params, editorAPI) {
            var translated = this.translateIfNeeded(key);
            var isValid = _.every(params, function (val, objKey) {
                return _.includes(translated, objKey);
            });
            if (isValid) {
                try {
                    translated = _.template(translated)(params);
                } catch (err) {
                    if (editorAPI) {
                        var biParams = {
                            p1: key,
                            p2: translated
                        };
                        editorAPI.bi.error(bi.errors.TRANSLATION_ERROR, biParams);
                    }
                }
            }
            return translated;
        }
    };
});
