// ************************** //
// Copyright Steven Mott 2016 //
// ************************** //

(function(app) {
    app.selectors = (function () {

        /**
         * Creates an instance of selectors
         * 
         * @constructor
         * @this {selectors}
         */
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