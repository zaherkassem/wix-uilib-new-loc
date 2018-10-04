require('wix-ui-jquery/switches/checkbox');
require('wix-ui-jquery/core/core');

define(['react'], function (React) {
    describe('checkbox test', function () {

        function givenInput(options) {
            options = options || {};
            $element.attr('wix-options', JSON.stringify(options));
            Wix.UI && Wix.UI.initialize({});
            return $element.getCtrl();
        }

        var element;
        var $element;
        beforeEach(function () {
            element = $('<div id="checkbox" wix-ctrl="Checkbox" wix-param="checkboxParam"></div>').appendTo('body')[0];
            $element = $(element);
            Wix.__disableStandaloneError__ = true;
        });

        describe('default values', function () {
            it('should create element in the dom', function () {
                givenInput();
                var $input = $element.find('.control-buttons-group');
                expect($input.find('.control-checkbox')).toBeDefined();
            });

            describe('defaultValue prop', function () {

                it('should set initial value to be true', function() {
                    var elem = givenInput({defaultValue: true});
                    expect(elem.getValue()).toBeTruthy();
                });

                it('should set initial value to be false', function() {
                    var elem = givenInput({defaultValue: false});
                    expect(elem.getValue()).toBeFalsy();
                });

                it('should set initial value to false in case no defaultValue given', function() {
                    var elem = givenInput({});
                    expect(elem.getValue()).toBeFalsy();
                });
            });


            it('should change value upon when set is called', function() {
                var elem = givenInput({});
                elem.setValue(true);
                expect(elem.getValue()).toBeTruthy();
            });

            it('should enable comp', function() {
                var elem = givenInput({});
                elem.enable();
                var input = $element.find('input');
                expect(input.attr('disabled')).not.toBeDefined();
            });

            it('should disable comp', function() {

                var elem = givenInput({});
                elem.disable();
                var input = $element.find('input');
                expect(input.attr('disabled')).toBeDefined();
            });

            //it('should set value from wix-param in case defined', function(done) {
            //    var wixParamValue = true;
            //    var elem;
            //
            //
            //    //spyOn(Wix.Utils, 'getViewMode').and.returnValue('editor');
            //    spyOn(Wix.Styles, 'getStyleParams').and.callFake(function(callback){
            //        callback({booleans:{'checkboxParam': wixParamValue}});
            //    });
            //    elem = givenInput({});
            //    expect(elem.getValue()).toBeTruthy();
            //});
            //
            //it('should set false value from wix-param in case defined', function(done) {
            //    var wixParamValue = false;
            //    var elem;
            //
            //    //spyOn(Wix.Utils, 'getViewMode').and.returnValue('editor');
            //    spyOn(Wix.Styles, 'getStyleParams').and.callFake(function(callback){
            //        callback({booleans:{'checkboxParam': wixParamValue}});
            //    });
            //    elem = givenInput({});
            //    expect(elem.getValue()).toBeTruthy();
            //});
            //
            //it('should set value from defaultValue in case wix-param not found upon componentDidMount', function(done){
            //    var wixParamValue = true;
            //    var elem;
            //
            //    //spyOn(Wix.Utils, 'getViewMode').and.returnValue('editor');
            //    spyOn(Wix.Styles, 'getStyleParams').and.callFake(function(callback){
            //        callback({booleans:{'noParamByThisName': wixParamValue}});
            //    });
            //    elem = givenInput({defaultValue: true});
            //    expect(elem.getValue()).toBeTruthy();
            //});
        });
    });
});

