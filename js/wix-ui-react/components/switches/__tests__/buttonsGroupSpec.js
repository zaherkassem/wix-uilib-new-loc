define(['react', 'lodash', 'wix-ui-react/components/switches/buttonsGroup'], function (React, _, buttonsGroup) {

    describe('buttonsGroup test', function () {

        var testUtils = React.addons.TestUtils;

        function getComp(props) {
            var elem = React.createElement(buttonsGroup, props);
            return testUtils.renderIntoDocument(elem);
        }

        it('should load module', function () {
            expect(buttonsGroup).toBeDefined();
        });

        it('should set initial value from defaultValue', function() {
            var comp = getComp({defaultValue: '4'});
            expect(comp.state.checked).toEqual('4');
        });

        it('should set initial value to undefined in case no defaultValue given', function() {
            var comp = getComp({});
            expect(comp.state.checked).toBeUndefined();
        });

        it('should change value when handleChange was called', function() {
            var comp = getComp({});
            comp.handleChange('1');
            expect(comp.state.checked).toEqual('1');
        });

        it('should update wix-param value when handleChange was called', function() {
            var comp = getComp({'wix-param': 'someParam'});
            spyOn(Wix.Styles, 'setNumberParam');
            comp.handleChange('1');
            expect(Wix.Styles.setNumberParam).toHaveBeenCalledWith('someParam', {value: '1'});
        });

        it('should set value from wix-param in case defined upon componentDidMount', function(done) {
            var wixParam = {value: '2'};
            var comp = getComp({
                defaultValue: '1',
                'wix-param': 'someParam'
            });
            var getStyleParams = function(callback){
                callback.call(this, {numbers:{'someParam': wixParam}}, function() {
                    expect(comp.state.checked).toEqual('2');
                    done();
                });
            };

            spyOn(Wix.Utils, 'getViewMode').and.returnValue('editor');
            spyOn(Wix.Styles, 'getStyleParams').and.callFake(getStyleParams);
            comp.componentDidMount();
        });

        it('should set value from wix-param in case defined as number upon componentDidMount', function(done) {
            var wixParam = {value: 2};
            var comp = getComp({
                defaultValue: '1',
                'wix-param': 'someParam'
            });
            var getStyleParams = function(callback){
                callback.call(this, {numbers:{'someParam': wixParam}}, function() {
                    expect(comp.state.checked).toEqual('2');
                    done();
                });
            };

            spyOn(Wix.Utils, 'getViewMode').and.returnValue('editor');
            spyOn(Wix.Styles, 'getStyleParams').and.callFake(getStyleParams);
            comp.componentDidMount();
        });


        it('should set value from defaultValue in case wix-param not found upon componentDidMount', function(done){
            var wixParam = {value: '2'};
            var comp = getComp({
                defaultValue: '1',
                'wix-param': 'someParam'
            });
            var getStyleParams = function(callback){
                callback.call(this, {numbers:{'noParamByThisName': wixParam}}, function() {
                    expect(comp.state.checked).toEqual('1');
                    done();
                });
            };
            spyOn(Wix.Utils, 'getViewMode').and.returnValue('editor');
            spyOn(Wix.Styles, 'getStyleParams').and.callFake(getStyleParams);
            comp.componentDidMount();
        });
    });
});
