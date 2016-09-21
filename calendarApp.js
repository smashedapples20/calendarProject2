(function(app) {
    var changeDate = function(date) {
        alert(date);
    }

    app.init = function() {
        $('#calendar').fullCalendar({
            defaultDate: '2016-09-21',
            selectable: true,
            selectHelper: false,
            select: function(start, end) {
                changeDate(end);
            },
            editable: false,
            eventLimit: true
        });
    }
})(window.app || (window.app = {}));