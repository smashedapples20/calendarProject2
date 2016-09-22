(function(app) {
    app.panel = (function() {
        var event;
        var selectors = app.selectors;

        function panel() {
        }

        var registerEventHandlers = function() {
            $('.overlay').click(dismiss);
            $('#cancel').click(dismiss);
            $('#save').click(saveAppointment);
        }

        var unregisterPanelEventHandlers = function() {
            $('overlay').unbind();
            $('#cancel').unbind();
            $('#save').unbind();
        }

        var saveAppointment = function() {
            updateEvent();
            $('.appointmentPanel').trigger("saveEvent", event);
            event = null;
            dismiss();
        }

        var dismiss = function() {
            $('.appointmentPanel').removeClass('appointmentPanel-shown');
            $('.overlay').removeClass('overlay-shown');

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

            $('.appointmentPanel').addClass('appointmentPanel-shown');
            $('.overlay').addClass('overlay-shown');

            registerEventHandlers();
        }

        return panel;
    })();
})(window.app || (window.app = {}));