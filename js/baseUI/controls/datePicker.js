define(['react', 'lodash', 'util', 'baseUI/controls/datePicker.rt'], function (React, _, util, template) {
    'use strict';

    var NUMBER_OF_WEEKS_FOR_FIXED_HEIGHT = 6;

    return React.createClass({
        displayName: 'datePicker',
        mixins: [util.valueLinkMixin, util.translationMixin],
        propTypes: {
            todayLabel: React.PropTypes.string,
            goToSelectedLabel: React.PropTypes.string,
            startDay: React.PropTypes.string,
            days: React.PropTypes.arrayOf(React.PropTypes.string),
            daysShort: React.PropTypes.arrayOf(React.PropTypes.string),
            monthNames: React.PropTypes.arrayOf(React.PropTypes.string),
            monthNamesShort: React.PropTypes.arrayOf(React.PropTypes.string),
            showDelete: React.PropTypes.bool,
            fixedNumberOfRows: React.PropTypes.bool
        },
        getDefaultProps: function () {
            return {
                todayLabel: 'Today',
                goToSelectedLabel: 'Go to selected',
                value: new Date(),
                days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                showShortNames: true,
                fixedNumberOfRows: true
            };
        },
        
        getDaysList: function(){
        	return (this.props.showShortNames) ?  this.props.daysShort : this.props.days;
        },
        getDays: function () {
        	var daysList = this.getDaysList();
            var result = _.map(daysList, this.translateIfNeeded);
            var startDay = this.props.startDay ? this.translateIfNeeded(this.props.startDay) : result[0];
            while (result[0] !== startDay) {
                result.push(result.shift());
            }

            return result;
        },

        getInitialState: function () {
            return {
                value: this.getValueFromProps() || new Date()
            };
        },

        getDatesInMonth: function () {
        	var daysList = this.getDaysList();
            var days = [];
            var day = new Date(this.state.value.getFullYear(), this.state.value.getMonth(), 1);
            var firstDayIndex = this.props.startDay ? daysList.indexOf(this.props.startDay) : 0;
            while (day.getDay() !== firstDayIndex) {
                day = new Date(day.getFullYear(), day.getMonth(), day.getDate() - 1);
                days.unshift(day);
            }

            day = new Date(this.state.value.getFullYear(), this.state.value.getMonth(), 1);
            while (day.getMonth() === this.state.value.getMonth()) {
                days.push(day);
                day = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1);
            }

            while (day.getDay() !== firstDayIndex) {
                days.push(day);
                day = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1);
            }

            if (this.props.fixedNumberOfRows) {
                var daysLeft = (NUMBER_OF_WEEKS_FOR_FIXED_HEIGHT * 7) - days.length;
                _.times(daysLeft, function() {
                    days.push(day);
                    day = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1);
                });
            }

            return days;
        },
        updateMonth: function (step) {
            var newDate = new Date(this.state.value.getFullYear(), this.state.value.getMonth() + step, this.state.value.getDate());
            this.setState({
                value: newDate
            });
        },
        getElementClasses: function (date) {
            var classes = [
                'dp-day',
                !date || date.getMonth() !== this.state.value.getMonth() && 'dp-day-not-in-current-month',
                this.isEquals(date, this.getValueFromProps()) && 'dp-day-selected',
                this.isEquals(date, new Date()) && 'dp-today'
            ];

            return _(classes).compact().join(' ');
        },
        isEquals: function (date1, date2) {
            if (date1 && !date2 || date2 && !date1) {
                return false;
            }

            return date1.getFullYear() === date2.getFullYear() &&
                date1.getMonth() === date2.getMonth() &&
                date1.getDate() === date2.getDate();
        },
        getMonthTitle: function () {
            var monthName = (this.props.showShortNames) 
            			? this.props.monthNamesShort[this.state.value.getMonth()]
            			: this.props.monthNames[this.state.value.getMonth()];
            return this.translateIfNeeded(monthName) + ' ' + this.state.value.getFullYear();
        },
        render: template
    });
});
