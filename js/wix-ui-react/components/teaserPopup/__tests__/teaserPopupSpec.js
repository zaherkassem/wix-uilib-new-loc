define(['react', 'wix-ui-react/components/teaserPopup/teaserPopup'], function (React, teaserPopup) {
    describe('teaserPopup test', function () {
        var testUtils = React.addons.TestUtils;

        function getComp(props) {
            var elem = React.createElement(teaserPopup, props);
            return testUtils.renderIntoDocument(elem);
        }

        it('should have default props', function () {
            var comp = getComp();
            expect(comp.props.linkText).toEqual('Learn more');
            expect(comp.props.gotItText).toEqual('Got it');
        });
        
        it('should call onClose callback', function(){
            var onCloseSpy = jasmine.createSpy('onCloseSpy');
            var comp = getComp({onClose: onCloseSpy});

            comp.biClose();

            expect(onCloseSpy).toHaveBeenCalled();
        });
    });
});
