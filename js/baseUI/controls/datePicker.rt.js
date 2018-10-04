define([
    'react/addons',
    'lodash',
    'baseUI/controls/button',
    'symbols'
], function (React, _, UIButton, symbols) {
    'use strict';
    function onClick1() {
        this.updateMonth(-1);
    }
    function onClick2() {
        this.updateMonth(1);
    }
    function repeatDay3(dates, currentMonth, day, dayIndex) {
        return React.createElement('td', {}, React.createElement('div', { 'className': 'dp-day-name' }, day));
    }
    function onClick4(dates, currentMonth, week, weekIndex, day, dayIndex) {
        this.callOnChangeIfExists(dates[7 * week + day]);
    }
    function repeatDay5(dates, currentMonth, week, weekIndex, day, dayIndex) {
        return React.createElement('td', { 'onClick': onClick4.bind(this, dates, currentMonth, week, weekIndex, day, dayIndex) }, React.createElement('div', { 'className': this.getElementClasses(dates[7 * week + day]) }, dates[7 * week + day] ? dates[7 * week + day].getDate() : ''));
    }
    function repeatWeek6(dates, currentMonth, week, weekIndex) {
        return React.createElement.apply(this, [
            'tr',
            {
                'className': 'dp-week',
                'key': dates[7 * week].getFullYear() + '_' + dates[7 * week].getMonth() + '_' + week
            },
            _.map(_.range(7), repeatDay5.bind(this, dates, currentMonth, week, weekIndex))
        ]);
    }
    function scopeDatesCurrentMonth7() {
        var dates = this.getDatesInMonth();
        var currentMonth = this.state.value.getMonth();
        return React.createElement('table', {}, React.createElement('thead', {}, React.createElement.apply(this, [
            'tr',
            {},
            _.map(this.getDays(), repeatDay3.bind(this, dates, currentMonth))
        ])), React.createElement.apply(this, [
            'tbody',
            {},
            _.map(_.range(dates.length / 7), repeatWeek6.bind(this, dates, currentMonth))
        ]));
    }
    function onClick8() {
        this.callOnChangeIfExists(null);
    }
    function onClick9() {
        this.setState({ value: new Date() });
    }
    function onClick10() {
        this.getValueFromProps() && this.setState({ value: this.getValueFromProps() });
    }
    return function () {
        return React.createElement('div', { 'className': 'input-date-picker' }, React.createElement('div', { 'className': 'dp-header' }, React.createElement('div', {
            'className': 'dp-navigate dp-previous',
            'onClick': onClick1.bind(this)
        }, React.createElement(symbols.symbol, { 'name': 'greaterThen' })), React.createElement('div', { 'className': 'dp-title' }, this.getMonthTitle()), React.createElement('div', {
            'className': 'dp-navigate dp-next',
            'onClick': onClick2.bind(this)
        }, React.createElement(symbols.symbol, { 'name': 'greaterThen' }))), React.createElement('div', { 'className': 'dp-body' }, scopeDatesCurrentMonth7.apply(this, [])), React.createElement('div', { 'className': 'dp-footer' + (this.props.showDelete ? ' with-delete-btn' : '') }, this.props.showDelete ? React.createElement(UIButton, {
            'className': 'delete-btn',
            'key': 'deleteButton',
            'icon': 'delete',
            'onClick': onClick8.bind(this)
        }) : null, React.createElement(UIButton, {
            'className': 'goto-today',
            'onClick': onClick9.bind(this),
            'label': this.translateIfNeeded(this.props.todayLabel),
            'shouldTranslate': false
        }), React.createElement(UIButton, {
            'className': 'goto-selection',
            'disabled': !this.props.value,
            'onClick': onClick10.bind(this),
            'shouldTranslate': false,
            'label': this.translateIfNeeded(this.props.goToSelectedLabel)
        })));
    };
});