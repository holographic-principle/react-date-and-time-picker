import React from 'react';
import PropTypes from 'prop-types';
import {getWeeksOfMonth} from './dateExtensions';
import {WEEK_DAYS_SHORT} from './ui_strings';
import {rotate, classes, getDateFromYearMonthAndDay} from './utils';
import classNames from './classNames';

const {
  TD_DAY,
  TODAY,
  SELECTED_DAY,
  SELECT_DAY,
  DISABLED,
  TH_DAY,
  TABLE,
  HOVER_SPAN,
} = classNames;

const Day = ({day}) => day;

Day.propTypes = {
  day: PropTypes.number,
};

const Week = ({year, month, week, selected, isDayDisabled}) => {
  const weekRow = week.map((day, index) => {
    const current = {year, month, day};
    const isSelected = selected &&
        ['year', 'month', 'day'].every(
          prop => current[prop] === selected[prop]);
    const dateToday = new Date();
    const today = {
      year: dateToday.getFullYear(),
      month: dateToday.getMonth(),
      day: dateToday.getDate(),
    };
    const isToday = ['year', 'month', 'day'].every(
      prop => current[prop] === today[prop]);
    return (
      <td key={index}
        className={classes(
          TD_DAY,
          day > 0 && SELECT_DAY,
          isSelected && SELECTED_DAY,
          isToday && TODAY,
          isDayDisabled(getDateFromYearMonthAndDay(current)) && DISABLED
        )}
      >
        {day > 0 &&
          <span className={classes(HOVER_SPAN)}>
            <Day day={day}/>
          </span>
        }
      </td>
    );
  });
  return ( <tr>{weekRow}</tr> );
};

Week.propTypes = {
  year: PropTypes.number,
  month: PropTypes.number,
  week: PropTypes.array,
  selected: PropTypes.object,
  isDayDisabled: PropTypes.func,
};

const Month = ({ year, month, selected, isDayDisabled}) => {
  const weeksOfMonth = getWeeksOfMonth(year, month);
  const weekDays = rotate(WEEK_DAYS_SHORT, 1);
  const weekLabels = weekDays.map(wday =>
    <th key={wday} className={TH_DAY}>{wday}</th>);
  const weekRows = weeksOfMonth.map(([, week], index) => (
    <Week key={index} {...{year, month, week, selected, isDayDisabled}} />
  ));
  return (
    <table className={TABLE}>
      <thead>
        <tr>{weekLabels}</tr>
      </thead>
      <tbody>
        {weekRows}
      </tbody>
    </table>
  );
};

Month.propTypes = {
  year: PropTypes.number,
  month: PropTypes.number,
  selected: PropTypes.object,
  isDayDisabled: PropTypes.func,
};

export default Month;
