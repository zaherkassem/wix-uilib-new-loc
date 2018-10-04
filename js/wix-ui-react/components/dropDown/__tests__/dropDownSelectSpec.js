define(['react', 'wix-ui-react/components/dropDown/dropDownSelect'], function (React, dropDownSelect) {

    describe('dropDownSelect test', function () {

        var testUtils = React.addons.TestUtils;

        function getComp(props) {
            var elem = React.createElement(dropDownSelect, props);
            return testUtils.renderIntoDocument(elem);
        }

        it('should load module', function () {
            expect(dropDownSelect).toBeDefined();
        });

        it('should set initial value from defaultValue', function() {
            var comp = getComp({
                defaultValue: '1',
                options: [
                    { value: '1', label: 'The first one', className: 'firstOne'},
                    { value: '2', label: 'The second one', className: 'differentOne'},
                    { value: '3', label: 'last but not least'}
                ]
            });
            expect(comp.state.value).toEqual('1');
        });

        it('should change value upon when handleChange was called', function() {
            var comp = getComp({
                defaultValue: '1',
                options: [
                    { value: '1', label: 'The first one', className: 'firstOne'},
                    { value: '2', label: 'The second one', className: 'differentOne'},
                    { value: '3', label: 'last but not least'}
                ]
            });
            comp.handleChange('2');
            expect(comp.state.value).toEqual('2');
        });

        it('should update wix-param value upon handleChange in case given', function() {
            var comp = getComp({
                'wix-param': 'someParam',
                defaultValue: '1',
                options: [
                    { value: '1', label: 'The first one', className: 'firstOne'},
                    { value: '2', label: 'The second one', className: 'differentOne'},
                    { value: '3', label: 'last but not least'}
                ]
            });
            spyOn(Wix.Styles, 'setNumberParam');
            comp.handleChange('2');
            expect(Wix.Styles.setNumberParam).toHaveBeenCalledWith('someParam', {value: '2'});
        });

        it('should set value from wix-param in case defined upon componentDidMount', function(done) {
            var wixParam = 3;
            var comp = getComp({
                defaultValue: '1',
                options: [
                    { value: '1', label: 'The first one', className: 'firstOne'},
                    { value: '2', label: 'The second one', className: 'differentOne'},
                    { value: '3', label: 'last but not least'}
                ],
                'wix-param': 'someParam'
            });
            var getStyleParams = function(callback){
                callback.call(this, {numbers:{'someParam': wixParam}}, function() {
                    expect(comp.state.value).toEqual(wixParam.toString());
                    done();
                });
            };

            spyOn(Wix.Utils, 'getViewMode').and.returnValue('editor');
            spyOn(Wix.Styles, 'getStyleParams').and.callFake(getStyleParams);
            comp.componentDidMount();
        });

        it('should call onChange upon handleChange', function() {
            var comp = getComp({
                onChange: jasmine.createSpy('onChange'),
                defaultValue: '1',
                options: [
                    { value: '1', label: 'The first one', className: 'firstOne'},
                    { value: '2', label: 'The second one', className: 'differentOne'},
                    { value: '3', label: 'last but not least'}
                ]
            });
            comp.handleChange('2');
            expect(comp.props.onChange).toHaveBeenCalledWith('2');
        });
    });
});