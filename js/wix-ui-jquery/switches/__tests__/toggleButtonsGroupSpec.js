require('wix-ui-jquery/switches/toggleButtonsGroup');
require('wix-ui-jquery/core/core');

define(['react'], function (React) {
    describe('toggleButtonsGroup', function () {

        function givenInput(options) {
            options = options || {};
            $element.attr('wix-options', JSON.stringify(options));
            Wix.UI && Wix.UI.initialize({});
            return $element.getCtrl();
        }

        var element;
        var $element;
        beforeEach(function () {
            element = $('<div id="toggleButtonsGroup" wix-ctrl="ToggleButtonsGroup"></div>').appendTo('body')[0];
            $element = $(element);
        });

        describe('default values', function () {
            it('default options', function () {
                givenInput();
                var $input = $element.find('.control-buttons-group');
                expect($input.find('.firstOne')).toBeDefined();
                expect($input.find('.second')).toBeDefined();
                expect($input.find('.last')).toBeDefined();
            });

            it('should set initial value from defaultValue', function() {
                var comp = givenInput({defaultValue: [1,2]});
                expect(comp.getValue()).toEqual([1,2]);
            });
        });

        //afterEach(function(){
        //    Wix.UI.destroy(element);
        //});
    });
});

