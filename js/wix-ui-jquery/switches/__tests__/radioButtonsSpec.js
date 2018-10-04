require('wix-ui-jquery/switches/radioButtons');
require('wix-ui-jquery/core/core');

define(['react'], function (React) {
    describe('radioButtons test', function () {

        function givenInput(options) {
            options = options || {};
            $element.attr('wix-options', JSON.stringify(options));
            Wix.UI && Wix.UI.initialize({});
            return $element.getCtrl();
        }

        var element;
        var $element;
        beforeEach(function () {
            element = $('<div id="radioButtons" wix-ctrl="RadioButtons" wix-param="radioButtonsParam"></div>').appendTo('body')[0];
            $element = $(element);
            Wix.__disableStandaloneError__ = true;
        });

        afterEach(function () {
            $element.remove();
        });

        describe('default values', function () {
            it('should create element in the dom', function () {
                givenInput();
                expect($element.find('.control-radio-buttons').length).toBe(1);
            });

            it('should bind onChange callback', function () {
                var onChangeSpy = jasmine.createSpy('onChangeSpy');

                var comp = givenInput({defaultValue: '3', options: [
                    { value: '1', label: 'The first one'},
                    { value: '2', label: 'The second one'},
                    { value: '3', label: 'last but not least'}
                ]});
                comp.onChange(onChangeSpy);
                comp.setValue('1');
                expect(onChangeSpy).toHaveBeenCalledWith('1');
            });
        });
    });
});

