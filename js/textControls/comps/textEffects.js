define(['react', 'lodash', 'textControls/comps/textEffects.rt', 'util', 'textControls/utils/constants'], function (React, _, template, util, constants) {
    'use strict';

    return React.createClass({
        displayName: 'textEffects',
        mixins: [util.translationMixin],
        render: template,
        getDefaultProps: function () {
            return {
                value: 'effect_0',
                onChange: function () {
                }
            };
        },
        getShadowEffects: function () {
            var effects = constants.EFFECTS;
            if (effects.effect_0) {
                delete effects.effect_0;
            }
            return effects;
        }
    });
});
