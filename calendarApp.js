(function(app) {
    app.mainViewModel = (function() {
        var id = 0;

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

            $('.appointmentPanel').on("saveEvent", function(_event, calEvent) {
                _event.stopPropagation();
                events.push(calEvent);
                updateCalendarViews();
                $('.appointmentPanel').off();
            });

            panel.show(event);
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

        function mainViewModel(_events, _panel) {
            panel = _panel;
            events = _events;
        }

        mainViewModel.prototype.init = function() { 
            id = events[events.length - 1].id++;

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
            });
        }

        return mainViewModel;
    })();
})(window.app || (window.app = {}));