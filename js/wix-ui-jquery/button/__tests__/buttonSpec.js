require('wix-ui-jquery/button/button');
require('wix-ui-jquery/core/core');

define(['react'], function (React) {
    describe('button', function () {

        function givenInput(options) {
            options = options || {};
            element.attr('wix-options', JSON.stringify(options));
            Wix.UI && Wix.UI.initialize({});
            return element.getCtrl();
        }

        var element;
        beforeEach(function () {
            element = $('<div id="sampleDock" wix-ctrl="Button"></div>').appendTo('body');
        });

        it('should disable the button', function () {
            var comp = givenInput();
            var cb = jasmine.createSpy('onClick');
            comp.onClick(cb);

            comp.disable();
            element.find('button').click();

            expect(cb).not.toHaveBeenCalled()
        });

        it('should enable the button', function () {
            var comp = givenInput();
            var cb = jasmine.createSpy('onClick');
            comp.onClick(cb);

            comp.disable();
            comp.enable();
            element.find('button').click();

            expect(cb).toHaveBeenCalled()
        });

        afterEach(function () {
            element.remove();
        });
    });
});
