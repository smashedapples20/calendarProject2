(function(app) {
    app.panel = (function() {
        var event;

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
            $('.appointmentPanel').trigger("saveEvent", event);
            event = null;
            dismiss();
        }

        var dismiss = function() {
            $('.appointmentPanel').removeClass('appointmentPanel-shown');
            $('.overlay').removeClass('overlay-shown');

            unregisterPanelEventHandlers();
        }

        panel.prototype.show = function(_event) {
            event = _event;

            $('.appointmentPanel').addClass('appointmentPanel-shown');
            $('.overlay').addClass('overlay-shown');

            registerEventHandlers();
        }

        return panel;
    })();
})(window.app || (window.app = {}));