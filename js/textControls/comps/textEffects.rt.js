define([
    'react/addons',
    'lodash',
    'textControls/comps/textEffectButton',
    'symbols',
    'baseUI'
], function (React, _, textEffectButton, symbols, UI) {
    'use strict';
    function onClick1() {
        this.props.onChange(2);
    }
    function onClick2(effect, effectIndex) {
        this.props.onChange(effect.value);
    }
    function repeatEffect3(effect, effectIndex) {
        return React.createElement(textEffectButton, {
            'isSelected': this.props.value === effectIndex,
            'onClick': onClick2.bind(this, effect, effectIndex),
            'key': effectIndex,
            'className': effectIndex
        }, React.createElement('span', {
            'className': 'text-shadow-effect',
            'style': { textShadow: effect.value }
        }, this.translateIfNeeded('text_editor_' + effectIndex)));
    }
    return function () {
        return React.createElement.apply(this, [
            'div',
            { 'className': 'text-effect-container' },
            React.createElement(UI.tooltip, {
                'value': 'text_editor_effects_tooltip_no_effect',
                'styleType': UI.uiConstants.TOOLTIP.STYLE_TYPE.SMALL
            }, React.createElement('span', {
                'onClick': onClick1.bind(this),
                'className': 'text-none-icon ' + (this.props.value === 'EFFECT_0' ? 'selected' : '')
            })),
            _.map(this.getShadowEffects(), repeatEffect3.bind(this))
        ]);
    };
});