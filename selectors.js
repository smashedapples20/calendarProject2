(function(app) {
    app.selectors = (function () {
        function selectors() {
        }

        selectors.agenda = "#agenda";
        selectors.appointmentName = "#appointmentName";
        selectors.appointmentPanel = ".appointmentPanel";
        selectors.calendar = "#calendar";
        selectors.cancel = "#cancel";
        selectors.description = "#description";
        selectors.overlay = ".overlay";
        selectors.save = "#save";
        selectors.startTime = "#startTime";
        selectors.endTime = "#endTime";

        return selectors;
    }());
})(window.app || (window.app = {}));