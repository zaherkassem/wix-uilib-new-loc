define(['react', 'wix-ui-react/components/switches/checkbox'], function (React, checkbox) {

    describe('checkbox test', function () {

        var testUtils = React.addons.TestUtils;

        function getComp(props) {
            var elem = React.createElement(checkbox, props);
            return testUtils.renderIntoDocument(elem);
        }

        it('should load module', function () {
            expect(checkbox).toBeDefined();
        });

        it('should set initial value from defaultValue', function() {
            var comp = getComp({defaultValue: 'true'});
            expect(comp.state.checked).toBeTruthy();
        });

        it('should set initial value to false in case no defaultValue given', function() {
            var comp = getComp({});
            expect(comp.state.checked).toBeFalsy();
        });

        it('should change value when handleChange was called', function(done) {
            var onChange = function () {
                expect(comp.state.checked).toBeTruthy();
                done();
            };
            var comp = getComp({onChange: onChange});
            comp.handleChange(true);
        });

        it('should enable comp', function(done) {
            var comp = getComp({});
            var originalSetState = comp.setState.bind(comp);
            spyOn(comp, 'setState').and.callFake(function (nextState, originalStateReady) {
                originalSetState(nextState, function () {
                    if (_.isFunction(originalStateReady)){
                        originalStateReady();
                    }
                    expect(comp.state.disabled).toBeFalsy();
                    done();
                })
            });
            comp.enable();
        });

        it('should disable comp', function(done) {
            var comp = getComp({});
            var originalSetState = comp.setState.bind(comp);
            spyOn(comp, 'setState').and.callFake(function (nextState, originalStateReady) {
                originalSetState(nextState, function () {
                    if (_.isFunction(originalStateReady)){
                        originalStateReady();
                    }
                    expect(comp.state.disabled).toBeTruthy();
                    done();
                })
            });
            comp.disable();
        });

        it('should set value from wix-param in case defined upon componentDidMount', function(done) {
            var wixParamValue = true;
            var comp = getComp({
                defaultValue: true,
                'wix-param': 'someParam'
            });
            var getStyleParams = function(callback){
                callback.call(this, {booleans:{'someParam': wixParamValue}}, function() {
                    expect(comp.state.checked).toBeTruthy();
                    done();
                });
            };

            spyOn(Wix.Utils, 'getViewMode').and.returnValue('editor');
            spyOn(Wix.Styles, 'getStyleParams').and.callFake(getStyleParams);
            comp.componentDidMount();
        });

        it('should set false value from wix-param in case defined upon componentDidMount', function(done) {
            var wixParamValue = false;
            var comp = getComp({
                defaultValue: false,
                'wix-param': 'someParam'
            });
            var getStyleParams = function(callback){
                callback.call(this, {booleans:{'someParam': wixParamValue}}, function() {
                    expect(comp.state.checked).toBeFalsy();
                    done();
                });
            };

            spyOn(Wix.Utils, 'getViewMode').and.returnValue('editor');
            spyOn(Wix.Styles, 'getStyleParams').and.callFake(getStyleParams);
            comp.componentDidMount();
        });

        it('should set value from defaultValue in case wix-param not found upon componentDidMount', function(done){
            var wixParamValue = false;
            var comp = getComp({
                defaultValue: false,
                'wix-param': 'someParam'
            });
            var getStyleParams = function(callback){
                callback.call(this, {booleans:{'noParamByThisName': wixParamValue}}, function() {
                    expect(comp.state.checked).toBeFalsy();
                    done();
                });
            };
            spyOn(Wix.Utils, 'getViewMode').and.returnValue('editor');
            spyOn(Wix.Styles, 'getStyleParams').and.callFake(getStyleParams);
            comp.componentDidMount();
        });
    });
});
