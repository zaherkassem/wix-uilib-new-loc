define(['react', 'wix-ui-react/components/contentTooltip/contentTooltip'], function (React, contentTooltip) {

    describe('contentTooltip test', function () {

        var testUtils = React.addons.TestUtils;

        function getComp(props) {
            var elem = React.createElement(contentTooltip, props);
            return testUtils.renderIntoDocument(elem);
        }

        it('should load module', function () {
            expect(contentTooltip).toBeDefined();
        });

        xit('should not add tooltip if there is enough space', function() {
            var child = React.createElement('div', {style: {
                width: '1px'
            }});
            var comp = getComp({
                children: child,
                style: {
                    width: '100px'
                }
            });
            comp.componentDidMount();
            expect(comp.state.shouldUseTooltip).toBeFalsy();
        });

        xit('should add tooltip if there is no enough space', function() {
            var child = React.createElement('div', {style: {
                width: '100px'
            }});
            var comp = getComp({
                children: child,
                style: {
                    width: '1px'
                }
            });
            comp.componentDidMount();
            expect(comp.state.shouldUseTooltip).toBeTruthy();
        });

        it('should add tooltip after window resize if there is no enough space', function() {
            // TODO
        });

        it('should remove tooltip after window resize if there is enough space', function() {
            // TODO
        });
    });
});