define(['lodash'], function (_) {
    'use strict';

    function panelManager() {

        var openedPanels = [];
        var panelUpdatesObservers = [];

        /**
         * Sole point of update for the openedPanels. Other methods MUST NOT change the opened panels array directly!
         * @private
         * @param newOpenedPanels
         */
        function updateOpenPanels(newOpenedPanels) {
            openedPanels = newOpenedPanels;
            notifyObservers();
        }

        function notifyObservers() {
            _.forEach(panelUpdatesObservers, function (observer) {
                observer();
            });
        }

        function createPanelProps(panelName, panelProps) {
            return _.assign({}, panelProps, {
                panelName: panelName,
                key: panelName + _.uniqueId()
            });
        }

        return {
            /**
             * Open a panel
             * @param panelName the package export path of the panel i.e. "compPanels.panels.SiteButton.settingsPanel"
             * @param {object} [panelProps] props that will be passed on to the requested panel when created (according to the panel's declared PropTypes i.e. "title", "position" etc.)
             * @param {boolean} [leavePanelsOpen] if other panels should remain open when opening the current panel. by default all panels should close
             */
            openPanel: function (panelName, panelClass, panelProps, leavePanelsOpen) {
                if (!leavePanelsOpen) {
                    this.closeAllPanels();
                }
                var currentInstance = _.find(openedPanels, {name: panelName});
                if (currentInstance && currentInstance.singleInstance) {
                    this.updatePanelProps(panelName, panelProps);
                    return;
                }
                var props = createPanelProps(panelName, panelProps);
                var panelDescriptor = {
                    name: panelName,
                    comp: React.createElement(panelClass, props),
                    props: props
                };
                updateOpenPanels(openedPanels.concat(panelDescriptor));
            },


            /**
             * Close an open panel that has the provided package export path
             * @param panelName the package export path of the panel i.e. "compPanels.panels.SiteButton.settingsPanel"
             */
            closePanelByName: function (panelName) {
                updateOpenPanels(_.reject(openedPanels, {name: panelName}));
            },

            /**
             * Close all panels that were chronologically opened after the provided one (not inclusive!)
             * @param panelName the package export path of the panel i.e. "compPanels.panels.SiteButton.settingsPanel"
             */
            closePanelsOpenedAfter: function (panelName) {
                var panelIndex = _.findIndex(this.getOpenPanels(), {name: panelName});
                updateOpenPanels(_.take(this.getOpenPanels(), panelIndex + 1));
            },
            /**
             * Close all open panels
             */
            closeAllPanels: function () {
                updateOpenPanels([]);
            },
            /**
             * Get an array of open panels descriptors
             *
             * @typedef {Object} PanelDescriptor
             * @property {string} name the package export path of the panel i.e. "compPanels.panels.SiteButton.settingsPanel"
             * @property {string} frameType type of frame, according to the frame's declared displayName
             * @property {string} props props that are passed on to the panel
             *
             * @return {Array.<PanelDescriptor>}
             */
            getOpenPanels: function () {
                return _.clone(openedPanels);
            },

            /**
             * Register an observer to be called on updates of the open panels' state
             *
             * @callback panelObserver
             *
             * @param {panelObserver} observer the observer-function to be called on update
             */
            registerObserver: function (observer) {
                panelUpdatesObservers.push(observer);
            },

            /**
             * Un Register an observer
             *
             * @param {panelObserver} observer the observer-function that was register using registerObserver
             */
            unregisterObserver: function (observer) {
                var observerIndex = _.indexOf(panelUpdatesObservers, observer);
                if (observerIndex > -1) {
                    panelUpdatesObservers.splice(observerIndex, 1);
                }
            },

            /**
             * Update panel props
             *
             * @param {string} panelName
             * @param {Object} props
             */
            updatePanelProps: function (panelName, props) {
                var updatedOpenPanels = this.getOpenPanels();
                var panels = _.filter(updatedOpenPanels, {name: panelName});
                _.forEach(panels, function (panel) {
                    _.merge(panel.props, props);
                    updateOpenPanels(updatedOpenPanels);
                }, this);
            }
        };
    }

    return panelManager;
});