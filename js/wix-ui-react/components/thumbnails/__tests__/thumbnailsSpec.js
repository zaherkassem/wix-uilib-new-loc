define(['react', 'react-dom', 'jquery', 'wix-ui-react/components/thumbnails/thumbnails'], function (React, ReactDOM, $, thumbnails) {
    'use strict';

    describe('text input', function(){
        var testUtils = React.addons.TestUtils;

        function renderComponent(props) {
            var elem = React.createElement(thumbnails, props);
            return testUtils.renderIntoDocument(elem);
        }

        describe('options', function () {
            it('should use props.src for the image', function () {
                var comp = renderComponent({
                    defaultValue: '1',
                    options: [
                        {value: '0', src: 'image-src-url', activeSrc: 'image-active-src-url'},
                        {value: '1', src: 'image-src-url', activeSrc: 'image-active-src-url'}
                    ]
                });
                var DOMNode = $(ReactDOM.findDOMNode(comp));
                var imageNode = DOMNode.find('label img').first();
                expect(imageNode.attr('src')).toBe('image-src-url');
            });

            it('should use props.activeSrc for the image if supplied when option is active', function () {
                var comp = renderComponent({
                    defaultValue: '0',
                    options: [
                        {value: '0', src: 'image-src-url', activeSrc: 'image-active-src-url'},
                        {value: '1', src: 'image-src-url', activeSrc: 'image-active-src-url'}
                    ]
                });
                var DOMNode = $(ReactDOM.findDOMNode(comp));
                var imageNode = DOMNode.find('label img').first();
                expect(imageNode.attr('src')).toBe('image-active-src-url');
            });

            it('should use props.src as fallback to props.activeSrc when option is active', function () {
                var comp = renderComponent({
                    defaultValue: '0',
                    options: [
                        {value: '0', src: 'image-src-url'},
                        {value: '1', src: 'image-src-url', activeSrc: 'image-active-src-url'}
                    ]
                });
                var DOMNode = $(ReactDOM.findDOMNode(comp));
                var imageNode = DOMNode.find('label img').first();
                expect(imageNode.attr('src')).toBe('image-src-url');
            });
        });

        describe('maxThumbsPerRow (1-5)', function () {
            function getMaxThumbsPerRow (comp) {
                var DOMNode = ReactDOM.findDOMNode(comp);
                return DOMNode.getAttribute('data-max-thumbs-per-row');
            }

            it('limit the number of thumbnails to 1 in row and resize them to fit row width', function () {
                var comp = renderComponent({maxThumbsPerRow: '1'});
                expect(getMaxThumbsPerRow(comp)).toEqual('1');
            });

            it('limit the number of thumbnails to 2 in row and resize them to fit row width', function () {
                var comp = renderComponent({maxThumbsPerRow: '2'});
                expect(getMaxThumbsPerRow(comp)).toEqual('2');
            });

            it('limit the number of thumbnails to 3 in row and resize them to fit row width', function () {
                var comp = renderComponent({maxThumbsPerRow: '3'});
                expect(getMaxThumbsPerRow(comp)).toEqual('3');
            });

            it('limit the number of thumbnails to 4 in row and resize them to fit row width', function () {
                var comp = renderComponent({maxThumbsPerRow: '4'});
                expect(getMaxThumbsPerRow(comp)).toEqual('4');
            });

            it('limit the number of thumbnails to 5 in row and resize them to fit row width', function () {
                var comp = renderComponent({maxThumbsPerRow: '5'});
                expect(getMaxThumbsPerRow(comp)).toEqual('5');
            });
        });

        describe('title', function () {
            it('should set comp thumbnails title if given', function () {
                var title = 'sample title';
                var comp = renderComponent({title: title});
                var domComp = $(ReactDOM.findDOMNode(comp));
                var actualTitle = domComp.find('.title').text();
                expect(actualTitle).toBe(title)
            });

            it('should not render title if no title', function () {
                var title = 'sample title';
                var comp = renderComponent({});
                var domComp = $(ReactDOM.findDOMNode(comp));
                var actualTitle = domComp.find('.title');
                expect(actualTitle.length).toBe(0)
            });
        });

        xdescribe('callbacks', function () {
            // TODO: find a way to test events.
            describe('onChange', function () {
                it('should trigger onChange callback', function () {
                    var changeSpy = jasmine.createSpy('onChange');
                    var comp = renderComponent({onMouseOver: changeSpy});
                    var domComp = $(ReactDOM.findDOMNode(comp));
                    React.addons.TestUtils.Simulate.change(domComp.find('label')[0]);
                    expect(changeSpy).toHaveBeenCalled();
                });
            });

            describe('onMouseOver', function () {
                it('should trigger onMouseOver callback', function () {
                    var hoverSpy = jasmine.createSpy();
                    var comp = renderComponent({onMouseOver: hoverSpy});
                    var domComp = $(ReactDOM.findDOMNode(comp));
                    React.addons.TestUtils.Simulate.mouseEnter(domComp.find('label')[0]);
                    expect(hoverSpy).toHaveBeenCalled();
                });
            });

            describe('onMouseOut', function () {
                it('should trigger onMouseout callback', function () {
                    var mouseOut = jasmine.createSpy();
                    var comp = renderComponent({onMouseOut: mouseOut});
                    var domComp = $(ReactDOM.findDOMNode(comp));
                    React.addons.TestUtils.Simulate.mouseLeave(domComp.find('label')[0]);
                    expect(mouseOut).toHaveBeenCalled();
                });
            });
        });

        describe('infoIcon', function () {
            // TODO: bug! fix it on thumbnails.rt
            xit('should add infoIcon if infoTitle exist', function () {
                var comp = renderComponent({infoTitle: 'infoTitle'});
                var domComp = $(ReactDOM.findDOMNode(comp));
                var infoIcon = domComp.find('.info-icon');
                expect(infoIcon.length).toBe(1);
            });

            it('should add infoIcon if infoText exist', function () {
                var comp = renderComponent({infoText: 'infoText'});
                var domComp = $(ReactDOM.findDOMNode(comp));
                var infoIcon = domComp.find('.info-icon');
                expect(infoIcon.length).toBe(1);
            });

            it('should not add infoIcon if there is no infoIcon and no infoText', function () {
                var comp = renderComponent({});
                var domComp = $(ReactDOM.findDOMNode(comp));
                var infoIcon = domComp.find('.info-icon');
                expect(infoIcon.length).toBe(0);
            });
        });

        describe('square', function () {
            it('should add square class to the comp root by default', function () {
                var comp = renderComponent({square: true});
                var domComp = $(ReactDOM.findDOMNode(comp));
                expect(domComp.hasClass('square')).toBeTruthy();
            });

            it('should add square class to the comp root if square is true', function () {
                var comp = renderComponent({});
                var domComp = $(ReactDOM.findDOMNode(comp));
                expect(domComp.hasClass('square')).toBeTruthy();
            });

            it('should add square class to the comp root if square is false', function () {
                var comp = renderComponent({square: false});
                var domComp = $(ReactDOM.findDOMNode(comp));
                expect(domComp.hasClass('square')).toBeFalsy();
            });

        });

        describe('activeDesign', function () {
            it('should add activeDesign value as a class', function () {
                var activeDesign = 'another-beautiful-class';
                var comp = renderComponent({activeDesign: activeDesign});
                var domComp = $(ReactDOM.findDOMNode(comp));
                expect(domComp.hasClass(activeDesign)).toBeTruthy();
            });
        });
    });
});
