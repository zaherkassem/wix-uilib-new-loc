define(['lodash'], function (_) {
    'use strict';

    var registeredTooltips = {};
    var tooltipRenderer = {
        updateDisplayedTooltips: _.noop
    };
    var idsCounter = 0;

    function getDisplayedTooltipsPresenterData() {
        return _(registeredTooltips).filter('isDisplayed').map('presenterData').value();
    }

    var tooltipManager = {
        generateId: function () {
            return 'tooltip_' + idsCounter++;
        },

        setTooltipRenderer: function (containerInstance) {
            tooltipRenderer = containerInstance;
        },

        registerOrUpdateTooltip: function (id, presenterData) {
            registeredTooltips[id] = registeredTooltips[id] || {};
            registeredTooltips[id].presenterData = _.assign({}, registeredTooltips[id].presenterData, presenterData);
            if (registeredTooltips[id].isDisplayed) {
                tooltipRenderer.updateDisplayedTooltips(getDisplayedTooltipsPresenterData());
            }
        },

        unRegisterTooltip: function (id) {
            this.hide(id);
            delete registeredTooltips[id];
        },

        isDisplayed: function (id) {
            return registeredTooltips[id] && registeredTooltips[id].isDisplayed;
        },

        createTooltip: function (showAfterCreation, params) {
            params.id = params.id || this.generateId();
            this.registerOrUpdateTooltip(params.id, params);
            if (showAfterCreation) {
                this.show(params.id);
            }
            return params.id;
        },

        show: function (id) {
            if (!registeredTooltips[id] || registeredTooltips[id].isDisplayed) {
                return;
            }

            registeredTooltips[id].isDisplayed = true;
            tooltipRenderer.updateDisplayedTooltips(getDisplayedTooltipsPresenterData());

            if (registeredTooltips[id].presenterData.onOpen) {
                registeredTooltips[id].presenterData.onOpen();
            }
        },

        toggle: function (id) {
            if (!registeredTooltips[id]) {
                return;
            }

            if (registeredTooltips[id].isDisplayed) {
                this.hide(id);
            } else {
                this.show(id);
            }
        },

        showForDuration: function (id, duration) {
            this.show(id);
            setTimeout(function () {
                this.hide(id);
            }.bind(this), duration);
        },

        notifyMouseLeave: function (id) {
            var tooltip = registeredTooltips[id];
            if (!tooltip || !tooltip.isDisplayed) {
                return;
            }
            if (tooltip.presenterData.interactive) {
                tooltip.presenterData.mouseLeftTargetNode = true;
                tooltipRenderer.updateDisplayedTooltips(getDisplayedTooltipsPresenterData());
            } else {
                this.hide(id);
            }

        },

        hide: function (id) {
            var tooltip = registeredTooltips[id];
            if (!this.isDisplayed(id)) {
                return;
            }
            tooltip.isDisplayed = false;
            tooltip.presenterData.mouseLeftTargetNode = false;
            tooltipRenderer.updateDisplayedTooltips(getDisplayedTooltipsPresenterData());

            if (tooltip.presenterData.onClose) {
                tooltip.presenterData.onClose();
            }
        },

        hideAll: function (callback) {
            _.forEach(registeredTooltips, function (tooltip) {
                tooltip.isDisplayed = false;
            });
            tooltipRenderer.updateDisplayedTooltips(getDisplayedTooltipsPresenterData(), callback);
        }
    };

    return tooltipManager;
});