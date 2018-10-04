/**
 * Created by avim on 4/16/2015.
 */
define(['lodash'], function (_) {
    'use strict';

    var LIFECYCLE_PHASES = {
        MOUNT: 'mount',
        UPDATE: 'update'
    };


    var pendingCounter = 0;
    var arrayOfCompsToMeasurePatch = [];

    function addComponentToSinglePassDOM(comp, phase) {
        pendingCounter++;
        arrayOfCompsToMeasurePatch.push({
            comp: comp,
            phase: phase
        });
    }

    function reportComponentReadyForSinglePassDOM() {
        pendingCounter--;
        if (pendingCounter === 0) {
            var measurements = _.map(arrayOfCompsToMeasurePatch, function (obj) {
                return obj.comp.measurePhase(obj.phase);
            });
            _.map(arrayOfCompsToMeasurePatch, function (obj, index) {
                obj.comp.patchPhase(measurements[index], obj.phase);
            });
            arrayOfCompsToMeasurePatch = [];
        }
    }

    return {
        componentWillMount: function () {
            addComponentToSinglePassDOM(this, LIFECYCLE_PHASES.MOUNT);
        },
        componentWillUpdate: function () {
            addComponentToSinglePassDOM(this, LIFECYCLE_PHASES.UPDATE);
        },
        componentDidMount: reportComponentReadyForSinglePassDOM,
        componentDidUpdate: reportComponentReadyForSinglePassDOM,
        componentWillUnmount: function () {
            arrayOfCompsToMeasurePatch = _.reject(arrayOfCompsToMeasurePatch, {comp: this});
        },
        LIFECYCLE_PHASES: LIFECYCLE_PHASES
    };
});