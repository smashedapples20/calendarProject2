(function(app) {
    app.panel = (function() {
        var event;
        var selectors = app.selectors;

        function panel() {
        }

        var registerEventHandlers = function() {
            $(selectors.overlay).click(dismiss);
            $(selectors.cancel).click(dismiss);
            $(selectors.save).click(saveAppointment);
        }

        var unregisterPanelEventHandlers = function() {
            $(selectors.appointmentPanel).off();
            $(selectors.overlay).unbind();
            $(selectors.cancel).unbind();
            $(selectors.save).unbind();
        }

        var saveAppointment = function() {
            updateEvent();
            $(selectors.appointmentPanel).trigger("saveEvent", event);
            event = null;
            dismiss();
        }

        var dismiss = function() {
            $(selectors.appointmentPanel).removeClass('appointmentPanel-shown');
            $(selectors.overlay).removeClass('overlay-shown');

            unregisterPanelEventHandlers();
        }

        var updateEvent = function() {
            event.title = $(selectors.appointmentName).val();
            event.description = $(selectors.description).val();
        }

        var updateView = function() {
            $(selectors.appointmentName).val(event.title);
            $(selectors.startTime).val(event.start.format("LT"));
            $(selectors.endTime).val(event.end.format("LT"));

            if (event.description) {
                $(selectors.description).val(event.description);
            } else {
                $(selectors.description).val('');
            }
        }

        panel.prototype.show = function(_event) {
            event = _event;

            updateView();

            $(selectors.appointmentPanel).addClass('appointmentPanel-shown');
            $(selectors.overlay).addClass('overlay-shown');

            registerEventHandlers();
        }

        return panel;
    })();
})(window.app || (window.app = {}));