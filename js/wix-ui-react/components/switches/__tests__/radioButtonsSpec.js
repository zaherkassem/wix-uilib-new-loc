define(['react', 'lodash', 'wix-ui-react/components/switches/radioButtons'], function (React, _, radioButtons) {

    describe('radioButtons test', function () {

        var testUtils = React.addons.TestUtils;

        function getComp(props) {
            var elem = React.createElement(radioButtons, props);
            return testUtils.renderIntoDocument(elem);
        }

        it('should load module', function () {
            expect(radioButtons).toBeDefined();
        });

        it('should set initial value from defaultValue', function() {
            var comp = getComp({defaultValue: '1'});
            expect(comp.state.value).toBeTruthy();
        });

        it('should set initial value to options[0].value in case no defaultValue given', function() {
            var comp = getComp({options: [{value: '1', label: 'one'}, {value: '2', label: 'two'}]});
            expect(comp.state.value).toEqual('1');
        });

        it('should set initial value to undefined in case no defaultValue given and no options given', function() {
            var comp = getComp({});
            expect(comp.state.value).toEqual(undefined);
        });

        it('should change value upon when handleChange was called', function(done) {
            var comp = getComp({});
            var callback = function() {
                expect(comp.state.value).toEqual('4');
                done();
            };
            comp.handleChangeInner('4', 'value', callback);
        });

        it('should trigger props.onChange', function (done) {
            var onChangeSpy = jasmine.createSpy('onChangeSpy');
            var comp = getComp({defaultValue: '0', onChange: onChangeSpy});
            comp.handleChangeInner(1, 'value', function () {
                expect(onChangeSpy).toHaveBeenCalledWith(1);
                done();
            });
        });

        it('should enable comp', function() {
            var comp = getComp({defaultValue: '0'});
            comp.enable();
            expect(comp.props.disabled).toBeFalsy();
        });

        it('should set value from wix-param in case defined upon componentDidMount', function(done) {
            var wixParam = {value: '3'};
            var comp = getComp({
                defaultValue: '0',
                'wix-param': 'someParam'
            });
            var getStyleParams = function(callback){
                callback.call(this, {numbers:{'someParam': wixParam}}, function() {
                    expect(comp.state.value).toEqual('3');
                    done();
                });
            };

            spyOn(Wix.Utils, 'getViewMode').and.returnValue('editor');
            spyOn(Wix.Styles, 'getStyleParams').and.callFake(getStyleParams);
            comp.componentDidMount();
        });

        it('should keep value from upon componentDidMount if wix-param not defined ', function(done) {
            var wixParam = {value: '3'};
            var comp = getComp({
                value: '5',
                'wix-param': 'someParam'
            });
            var getStyleParams = function(callback){
                callback.call(this, {numbers:{'nonExistingParam': wixParam}}, function() {
                    expect(comp.state.value).toEqual('5');
                    done();
                });
            };

            spyOn(Wix.Utils, 'getViewMode').and.returnValue('editor');
            spyOn(Wix.Styles, 'getStyleParams').and.callFake(getStyleParams);
            comp.componentDidMount();
        });

        it('should set value to defaultValue instead of wix-param upon componentDidMount if not defined for the 1st time', function(done) {
            var wixParam = {value: '3'};
            var comp = getComp({
                defaultValue: '0',
                'wix-param': 'someParam'
            });
            var getStyleParams = function(callback){
                callback.call(this, {numbers:{'nonExistingParam': wixParam}}, function() {
                    expect(comp.state.value).toEqual('0');
                    done();
                });
            };

            spyOn(Wix.Utils, 'getViewMode').and.returnValue('editor');
            spyOn(Wix.Styles, 'getStyleParams').and.callFake(getStyleParams);
            comp.componentDidMount();
        });

        it('should set value to options[0].value instead of wix-param upon componentDidMount if not defined and defaultValue not defined for the 1st time', function(done) {
            var wixParam = {value: '3'};
            var comp = getComp({
                options: [{value: '1', label: 'one'}, {value: '2', label: 'two'}],
                'wix-param': 'someParam'
            });
            var getStyleParams = function(callback){
                callback.call(this, {numbers:{'nonExistingParam': wixParam}}, function() {
                    expect(comp.state.value).toEqual('1');
                    done();
                });
            };

            spyOn(Wix.Utils, 'getViewMode').and.returnValue('editor');
            spyOn(Wix.Styles, 'getStyleParams').and.callFake(getStyleParams);
            comp.componentDidMount();
        });
    });
});