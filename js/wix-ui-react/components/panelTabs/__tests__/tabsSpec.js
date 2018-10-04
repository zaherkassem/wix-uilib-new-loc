define(['react-dom', 'react', 'jquery', 'Wix', 'wix-ui-react/components/panelTabs/tabs', 'baseUI/popovers/tooltipManager'], function (ReactDOM, React, $, Wix, tabs, tooltipManager) {

    describe('tabs test', function () {

        var testUtils = React.addons.TestUtils;

        function getComp(props) {
            var elem = React.createElement(tabs, props);
            return testUtils.renderIntoDocument(elem);
        }

        beforeAll(function () {
            spyOn(tooltipManager, 'hideAll');
        });

        describe('initialize', function () {

            it('should load module', function () {
                expect(tabs).toBeDefined();
            });

            it('should create tab for all children with tab prop', function () {
                var tab1 = React.createElement('div', {tab: "tab1 label"}, 'tab1 content');
                var tab2 = React.createElement('div', {tab: "tab2 label"}, 'tab2 content');
                var notATab = React.createElement('div', {}, 'regular div');
                var comp = getComp({
                    children: [tab1, tab2, notATab]
                });
                var tabsDom = ReactDOM.findDOMNode(comp);
                expect(tabsDom.childNodes.length).toBe(2);

                var tabsMenuDOM = tabsDom.childNodes[0];
                expect(tabsMenuDOM.className).toBe('tabs-menu');

                var customScroll = tabsDom.childNodes[1].childNodes[0];
                expect(customScroll.className).toBe('custom-scroll');

                var tabsContentDOM = tabsDom.childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[3];
                expect(tabsContentDOM.className).toBe('active-tab-content');
                expect(tabsContentDOM.childNodes.length).toBe(3);
            });
        });

        describe('active tab', function () {
            describe('defaultTabIndex', function () {
                it('should set the 0 tab index as default if activeTabIndex not supplied', function () {
                    var tab1 = React.createElement('div', {tab: "tab1 label"}, 'tab1 content');
                    var tab2 = React.createElement('div', {tab: "tab2 label"}, 'tab2 content');
                    var notATab = React.createElement('div', {}, 'regular div');
                    var comp = getComp({
                        children: [tab1, tab2, notATab]
                    });
                    expect(comp.state.activeTabIndex).toBe(0);
                });

                it('should set active tab according to activeTabIndex', function () {
                    var tab1 = React.createElement('div', {tab: "tab1 label"}, 'tab1 content');
                    var tab2 = React.createElement('div', {tab: "tab2 label"}, 'tab2 content');
                    var notATab = React.createElement('div', {}, 'regular div');
                    var comp = getComp({
                        defaultTabIndex: 1,
                        children: [tab1, tab2, notATab]
                    });
                    expect(comp.state.activeTabIndex).toBe(1);
                });

                it('should skip non tab elements', function () {
                    var tab1 = React.createElement('div', {tab: "tab1 label"}, 'tab1 content');
                    var notATab = React.createElement('div', {}, 'regular div');
                    var tab2 = React.createElement('div', {tab: "tab2 label"}, 'tab2 content');
                    var comp = getComp({
                        defaultTabIndex: 1,
                        children: [tab1, notATab, tab2]
                    });
                    expect(comp.state.activeTabIndex).toBe(2);
                });
            });

            describe('setActiveTab', function () {
                it('should set active tab', function () {
                    var tab1 = React.createElement('div', {tab: "tab1 label"}, 'tab1 content');
                    var tab2 = React.createElement('div', {tab: "tab2 label"}, 'tab2 content');
                    var notATab = React.createElement('div', {}, 'regular div');
                    var comp = getComp({
                        defaultTabIndex: 1,
                        children: [tab1, tab2, notATab]
                    });
                    expect(comp.state.activeTabIndex).toBe(1);
                    comp.setActiveTab(0);
                    expect(comp.state.activeTabIndex).toBe(0);
                    comp.setActiveTab(1);
                    expect(comp.state.activeTabIndex).toBe(1);
                });

                it('should skip non tab elements', function () {
                    var notATab = React.createElement('div', {}, 'regular div');
                    var tab2 = React.createElement('div', {tab: "tab2 label"}, 'tab2 content');
                    var comp = getComp({
                        children: [notATab, tab2]
                    });
                    comp.setActiveTab(0);
                    expect(comp.state.activeTabIndex).toBe(1);
                });

                it('should ignore out of range tabs', function () {
                    var tab1 = React.createElement('div', {tab: "tab1 label"}, 'tab1 content');
                    var notATab = React.createElement('div', {}, 'regular div');
                    var tab2 = React.createElement('div', {tab: "tab2 label"}, 'tab2 content');
                    var comp = getComp({
                        defaultTabIndex: 0,
                        children: [tab1, notATab, tab2]
                    });
                    comp.setActiveTab(-1);
                    expect(comp.state.activeTabIndex).toBe(0);
                    comp.setActiveTab(999);
                    expect(comp.state.activeTabIndex).toBe(0);
                });
            });
        });

        describe('getMenuLabelWidth', function () {
            var comp;
            var windowWidthMock = 1000;
            var CONTENT_WIDTH = 288;
            var MENU_PADDING = 10;

            beforeAll(function () {
                spyOn(Wix.Utils, 'getWidth').and.returnValue(windowWidthMock);

                var tab1 = React.createElement('div', {tab: "tab1 label"}, 'tab1 content');
                var tab2 = React.createElement('div', {tab: "tab2 label"}, 'tab2 content');
                var notATab = React.createElement('div', {}, 'regular div');
                comp = getComp({
                    defaultTabIndex: 1,
                    children: [tab1, tab2, notATab]
                });
            });

            it('should calculate menu label width', function () {
                expect(comp.getMenuLabelWidth()).toBe(windowWidthMock - CONTENT_WIDTH - 2 * MENU_PADDING);
            });
        });

        describe('onActive', function () {
            it('should invoke tab.props.onActive/onChange on component mount', function () {
                var tab0 = React.createElement('div', {
                    tab: "tab0 label",
                    onActive: jasmine.createSpy('onActive')
                }, 'tab0 content');
                var tab1 = React.createElement('div', {
                    tab: "tab1 label",
                    onActive: jasmine.createSpy('onActive')
                }, 'tab1 content');
                var notATab = React.createElement('div', {}, 'regular div');
                var comp = getComp({
                    defaultTabIndex: 0,
                    children: [tab0, tab1, notATab],
                    onChange: jasmine.createSpy('onChange')
                });
                expect(comp.props.onChange).toHaveBeenCalledWith(0);
                expect(tab0.props.onActive).toHaveBeenCalled();
                expect(tab1.props.onActive).not.toHaveBeenCalled();
            });

            it('should invoke tab.props.onActive when tab being active', function () {
                var tab0 = React.createElement('div', {
                    tab: "tab0 label",
                    onActive: jasmine.createSpy('onActive')
                }, 'tab0 content');
                var tab1 = React.createElement('div', {
                    tab: "tab1 label",
                    onActive: jasmine.createSpy('onActive')
                }, 'tab1 content');
                var tab2 = React.createElement('div', {
                    tab: "tab2 label",
                    onActive: jasmine.createSpy('onActive')
                }, 'tab2 content');
                var notATab = React.createElement('div', {}, 'regular div');
                var comp = getComp({
                    children: [tab0, tab1, tab2, notATab],
                    onChange: jasmine.createSpy('onChange')
                });

                comp.setActiveTab(1);
                expect(tab1.props.onActive).toHaveBeenCalled();
                expect(tab2.props.onActive).not.toHaveBeenCalled();
            });

            it('should invoke tabs.props.onChange on active tab change', function () {
                var tab0 = React.createElement('div', {
                    tab: "tab0 label",
                    onActive: jasmine.createSpy('onActive')
                }, 'tab0 content');
                var tab1 = React.createElement('div', {
                    tab: "tab1 label",
                    onActive: jasmine.createSpy('onActive')
                }, 'tab1 content');
                var notATab = React.createElement('div', {}, 'regular div');
                var comp = getComp({
                    children: [tab0, tab1, notATab],
                    onChange: jasmine.createSpy('onChange')
                });

                comp.setActiveTab(0);
                expect(comp.props.onChange).toHaveBeenCalledWith(0);

                comp.setActiveTab(1);
                expect(comp.props.onChange).toHaveBeenCalledWith(1);
            });
        });

        describe('tab notification', function () {
            describe('showTabNotification', function () {
                it('should add notification info to the given tab', function () {
                    var tab1 = React.createElement('div', {tab: "tab1 label"}, 'tab1 content');
                    var tab2 = React.createElement('div', {tab: "tab2 label"}, 'tab2 content');
                    var comp = getComp({
                        children: [tab1, tab2]
                    });
                    var tabIndexToAttachNotification = 0;
                    var tooltipText = 'tooltip text';
                    var compDOM = $(ReactDOM.findDOMNode(comp));
                    comp.showTabNotification(tabIndexToAttachNotification, tooltipText);
                    var expectedInfo = {};
                    expectedInfo[tabIndexToAttachNotification] = {tooltip: tooltipText};
                    expect(comp.state.info).toEqual(expectedInfo);
                    expect(compDOM.find('.symbol-tooltipWarning').length).toBe(1);
                });
            });

            describe('removeTabNotification', function () {
                it('should remove notification info to the given tab', function () {
                    var tab1 = React.createElement('div', {tab: "tab1 label"}, 'tab1 content');
                    var tab2 = React.createElement('div', {tab: "tab2 label"}, 'tab2 content');
                    var comp = getComp({
                        children: [tab1, tab2]
                    });
                    var tabIndexToAttachNotification = 0;
                    var tooltipText = 'tooltip text';
                    var compDOM = $(ReactDOM.findDOMNode(comp));
                    comp.showTabNotification(tabIndexToAttachNotification, tooltipText);
                    var expectedInfo = {};
                    expectedInfo[tabIndexToAttachNotification] = {tooltip: tooltipText};
                    expect(comp.state.info).toEqual(expectedInfo);
                    expect(compDOM.find('.symbol-tooltipWarning').length).toBe(1);
                    comp.removeTabNotification(tabIndexToAttachNotification, tooltipText);
                    expect(comp.state.info).toEqual({});
                    expect(compDOM.find('.symbol-tooltipWarning').length).toBe(0);
                });
            });

            describe('shouldShowNotification', function () {
                var tab1 = React.createElement('div', {tab: "tab1 label"}, 'tab1 content');
                var tab2 = React.createElement('div', {tab: "tab2 label"}, 'tab2 content');
                var comp;

                beforeEach(function () {
                    comp = getComp({
                        children: [tab1, tab2]
                    });
                });


                it('should be truthy when notification exixt', function () {
                    comp.showTabNotification(0, 'tooltip text');
                    expect(comp.shouldShowNotification(0)).toBeTruthy();
                    expect(comp.shouldShowNotification(1)).toBeFalsy();
                });

                it('should be falsy after turning notification off', function () {
                    comp.showTabNotification(0, 'tooltip text');
                    comp.removeTabNotification(0, 'tooltip text');
                    expect(comp.shouldShowNotification(1)).toBeFalsy();
                });
            })
        });

        describe('tooltips should be close', function () {
            it('should be closed on scroll', function () {
                var tab1 = React.createElement('div', {tab: "tab1 label"}, 'tab1 content');
                var tab2 = React.createElement('div', {tab: "tab2 label"}, 'tab2 content');
                var comp = getComp({
                    defaultTabIndex: 0,
                    children: [tab1, tab2]
                });
                comp.refs.customScroll.updateScrollPosition(120);
                expect(tooltipManager.hideAll).toHaveBeenCalled()
            })

            it('should be closed on tab navigation', function () {
                var tab1 = React.createElement('div', {tab: "tab1 label"}, 'tab1 content');
                var tab2 = React.createElement('div', {tab: "tab2 label"}, 'tab2 content');
                var comp = getComp({
                    defaultTabIndex: 0,
                    children: [tab1, tab2]
                });
                comp.setActiveTab(1);
                expect(tooltipManager.hideAll).toHaveBeenCalled()
            })
        })
    });
});
