(function(app) {
    var id = 2;

    var events = [
        {
            id: 1,
            title: 'Repeating Event',
            start: '2016-09-16T16:00:00'
        }];

    var changeDate = function(start, end) {
        $('#agenda').fullCalendar('gotoDate', start);
    }

    var createAppointment = function (start, end) {
        var event = {
            id: id++,
            title: 'Event name',
            start: start,
            end: end
        };

        updateAndShowPanel(event);
    }

    var updateAppointment = function(event) {
        var eventToUpdate = events.find(function(value) {
            return value.id === event.id;
        });

        eventToUpdate.title = event.title;
        eventToUpdate.start = event.start;
        eventToUpdate.end = event.end;
        
        updateCalendarViews();
    }

    var updateCalendarViews = function() {
        $('#calendar').fullCalendar('refetchEvents');
        $('#agenda').fullCalendar('refetchEvents');
    }

    var updateAndShowPanel = function(event) {
        $('.appointmentPanel').addClass('appointmentPanel-shown');
        $('.overlay').addClass('overlay-shown');

        registerPanelEventHandlers();
    }

    var dismissPanel = function() {
        $('.appointmentPanel').removeClass('appointmentPanel-shown');
        $('.overlay').removeClass('overlay-shown');

        unregisterPanelEventHandlers();
    }

    var registerPanelEventHandlers = function() {
        $('.overlay').click(dismissPanel);
        $('#cancel').click(dismissPanel);
        $('#save').click(saveAppointment);
    }

    var unregisterPanelEventHandlers = function() {
        $('overlay').unbind();
        $('#cancel').unbind();
        $('#save').unbind();
    }

    app.init = function() {
        $('#calendar').fullCalendar({
            defaultDate: '2016-09-21',
            events: function(start, end, timezone, callback) {
                callback(events);    
            },
            selectable: true,
            selectHelper: false,
            select: function(start, end) {
                changeDate(start, end);
            },
            editable: true,
            eventDrop: function(event, delta, revertFunc) {
                updateAppointment(event);
            },
            eventLimit: true
        });

        $('#agenda').fullCalendar({
            defaultDate: '2016-09-21',
            events: function(start, end, timezone, callback) {
                callback(events);
            },
            selectable: true,
            selectHelper: false,
            select: function(start, end) {
                createAppointment(start, end);
            },
            editable: true,
            eventDrop: function(event, delta, revertFunc) {
                updateAppointment(event);
            },
            defaultView: 'agendaDay'
        })
    }
})(window.app || (window.app = {}));