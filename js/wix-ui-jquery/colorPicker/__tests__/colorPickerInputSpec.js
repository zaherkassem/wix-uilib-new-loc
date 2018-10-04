require('wix-ui-jquery/colorPicker/colorPickerInput');
require('wix-ui-jquery/core/core');

define(['react'], function (React) {
    describe('checkbox test', function () {
        var element;
        var $element;

        function givenInput(options) {
            options = options || {};
            $element.attr('wix-options', JSON.stringify(options));
            Wix.UI && Wix.UI.initialize({});
            return $element.getCtrl();
        }

        beforeEach(function () {
            element = $('<div id="color-picker" wix-ctrl="ColorPickerInput" wix-param="ColorPickerInput"></div>').appendTo('body')[0];
            $element = $(element);
            Wix.__disableStandaloneError__ = true;
        });

        describe('default values', function () {
            it('should set initial value from defaultValue', function() {
                var comp = givenInput({startWithColor: 'color-3'});
                expect(comp.getValue()).toEqual({ opacity: 1, color: '', name: 'color-3' });
            });

            it('should have the right plugin name', function () {
                var comp = givenInput();
                expect(comp.pluginName).toBe('ColorPickerInput');
            });

            it('should not have opacity slider', function () {
                var comp = givenInput();
                expect(comp.$el.find('.input-slider').length).toBe(0);
            });
        });
    });
});

