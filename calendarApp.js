// ************************** //
// Copyright Steven Mott 2016 //
// ************************** //

(function(app) {
    app.calendarController = (function() {
        var selectors = app.selectors;
        var id = 0;

        /**
         * Creates and instance of calendarController
         * 
         * @constructor
         * @param {event[]} _events The events to initialize the calendars with.
         * @param {panel} _panel The appointmentPanel to use with these calendars.
         */
        function calendarController(_events, _panel) {
            panel = _panel;
            events = _events;
        }
        
        /**
         * Initializes the calendarController.
         */
        calendarController.prototype.init = function() { 
            id = events[events.length - 1].id + 1;

            $(selectors.calendar).fullCalendar({
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

            $(selectors.agenda).fullCalendar({
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
                selectHelper: false,
                viewRender: function(view, element) {
                    updateCalendarSelectedDate(view.start);
                }
            });
        }

        var changeDate = function(date) {
            $(selectors.agenda).fullCalendar('gotoDate', date);
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

            $(selectors.appointmentPanel).on('saveEvent', function(_event, calEvent) {
                _event.stopPropagation();
                events.push(calEvent);
                updateCalendarViews();
                $(selectors.appointmentPanel).off();
            });

            panel.show(event);
        }

        var editAppointment = function (event) {
            var eventToEdit = getEventForEdit(event);

            $(selectors.appointmentPanel).on('saveEvent', function(_event, calEvent) {
                _event.stopPropagation();

                eventToEdit.title = event.title;
                eventToEdit.description = event.description;

                updateCalendarViews();
                $(selectors.appointmentPanel).off();
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
            $(selectors.calendar).fullCalendar('refetchEvents');
            $(selectors.agenda).fullCalendar('refetchEvents');
        }

        return calendarController;
    })();
})(window.app || (window.app = {}));