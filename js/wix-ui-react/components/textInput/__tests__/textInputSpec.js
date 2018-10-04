define(['react', 'wix-ui-react/components/textInput/textInput'], function (React, textIput) {
    'use strict';

    describe('text input', function(){
        var testUtils = React.addons.TestUtils;

        function renderComponent(props) {
            var elem = React.createElement(textIput, props);
            return testUtils.renderIntoDocument(elem);
        }

        it('should return the input value', function(){
            var comp = renderComponent({});
            expect(comp.getValue()).toEqual('');
        });

        it('should set a new value', function(){
            var comp = renderComponent({});
            var originalSetState = comp.setState.bind(comp);
            spyOn(comp, 'setState').and.callFake(function (nextState) {
                originalSetState(nextState, function () {
                    expect(comp.getValue()).toEqual('new value');
                    done();
                })
            });

            comp.setValue('new value');
        });
    });
});
