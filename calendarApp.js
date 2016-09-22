(function(app) {
    app.mainViewModel = (function() {
        var selectors = app.selectors;
        var id = 0;

        var changeDate = function(date) {
            $('#agenda').fullCalendar('gotoDate', date);
        }

        var updateCalendarSelectedDate = function(moment) {
            $(selectors.calendar).fullCalendar('unselect');
            $(selectors.calendar).fullCalendar('select', moment);
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

        var editAppointment = function (event) {
            var eventToEdit = getEventForEdit(event);

            $('.appointmentPanel').on("saveEvent", function(_event, calEvent) {
                _event.stopPropagation();

                eventToEdit.title = event.title;
                eventToEdit.description = event.description;

                updateCalendarViews();
                $('.appointmentPanel').off();
            });

            panel.show(event);
        }

        var getEventForEdit = function (event) {
            return events.find(function(value) {
                return value.id === event.id;
            });
        }

        var updateAppointment = function(event) {
            var eventToUpdate = getEventForEdit(event);

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
            id = events[events.length - 1].id + 1;

            $('#calendar').fullCalendar({
                defaultDate: '2016-09-21',
                contentHeight: 'auto',
                height: 'auto',
                events: function(start, end, timezone, callback) {
                    callback(events);    
                },
                selectable: false,
                dayClick: function(date, jsEvent, view) {
                    changeDate(date);
                },
                editable: true,
                eventClick: function(calEvent, jsEvent, view) {
                    editAppointment(calEvent);
                },
                eventDrop: function(event, delta, revertFunc) {
                    updateAppointment(event);
                },
                eventLimit: true
            });

            $('#agenda').fullCalendar({
                defaultDate: '2016-09-21',
                defaultView: 'agendaDay',
                editable: true,
                events: function(start, end, timezone, callback) {
                    callback(events);
                },
                eventClick: function(calEvent, jsEvent, view) {
                    editAppointment(calEvent);
                },
                eventDrop: function(event, delta, revertFunc) {
                    updateAppointment(event);
                },
                eventResize: function(event, delta, revertFunc) {
                    updateAppointment(event);
                },
                height: 'parent',
                select: function(start, end) {
                    createAppointment(start, end);
                },
                selectable: true,
                selectHelper: true,
                viewRender: function(view, element) {
                    updateCalendarSelectedDate(view.start);
                }
            });
        }

        return mainViewModel;
    })();
})(window.app || (window.app = {}));