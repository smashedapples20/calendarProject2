(function(app) {
    var events = [
        {
            id: 1,
            title: 'Repeating Event',
            start: '2016-09-16T16:00:00'
        }];

    var changeDate = function(start, end) {
        // var title = prompt('Event title:');
        // var eventData;

        // if (title) {
        //     events.push({
        //         title: title,
        //         start: start,
        //         end: end
        //     });

        //     $('#calendar').fullCalendar('refetchEvents');
        // }
        // $('#calendar').fullCalendar('unselect');
        $('#agenda').fullCalendar('gotoDate', start);
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
            editable: false,
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
                changeTime(start, end);
            },
            editable: true,
            eventDrop: function(event, delta, revertFunc) {
                $('#calendar').fullCalendar('updateEvent', event);
                $('#calendar').fullCalendar('refetchEvents');
            },
            defaultView: 'agendaDay'
        })
    }
})(window.app || (window.app = {}));