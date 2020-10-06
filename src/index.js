import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';
import {MONTH_NAMES_SHORT} from './ui_strings';
import {classes, Enum, isBefore, TargetManager} from './utils';
import classNames from './classNames';
import Month from './month';
import SelectMonth from './selectMonth';
import SelectYear from './selectYear';
import Time from './time';
import './index.css';

const {
  ROOT,
  HOVER_SPAN,
  SELECTED,
  HEADER_ROW,
  HEADER_GROUP,
  HEADER_MONTH,
  HEADER_YEAR,
  MAIN_SECTION,
  FOOTER_ROW,
  SELECT_DAY,
  SELECT_MONTH,
  SELECT_YEAR,
  SELECT_TIME,
  SELECT_CALENDAR,
  SELECT_TODAY,
  PREVIOUS_YEAR,
  PREVIOUS_MONTH,
  PREVIOUS_HOUR,
  PREVIOUS_MINUTE,
  NEXT_YEAR,
  NEXT_MONTH,
  NEXT_HOUR,
  NEXT_MINUTE,
  CLEAR_SELECTION,
  VIEW_DAYS,
  VIEW_MONTHS,
  VIEW_YEARS,
  VIEW_TIME,
  DISABLED,
  ICON_CHEVRON_LEFT,
  ICON_CHEVRON_RIGHT,
  MATERIAL_ICONS,
} = classNames;

const targetManager = new TargetManager({
  click: [
    SELECT_DAY,
    SELECT_MONTH,
    SELECT_YEAR,
    SELECT_TIME,
    HEADER_MONTH,
    HEADER_YEAR,
    NEXT_YEAR,
    NEXT_MONTH,
    NEXT_HOUR,
    NEXT_MINUTE,
    PREVIOUS_YEAR,
    PREVIOUS_MONTH,
    PREVIOUS_HOUR,
    PREVIOUS_MINUTE,
    SELECT_CALENDAR,
    SELECT_TODAY,
    CLEAR_SELECTION,
  ],
});

const [
  DAYS,
  MONTHS,
  YEARS,
  TIME,
] = Enum();

const modeViewsMap = new Map([
  [DAYS, VIEW_DAYS],
  [MONTHS, VIEW_MONTHS],
  [YEARS, VIEW_YEARS],
  [TIME, VIEW_TIME],
]);

const Header = ({
  monthName,
  year,
  mode,
  areArrowControlsDisabled,
  materialIconsClass
}) => {
  return (
    <div className={HEADER_ROW}>
      <div className={HEADER_GROUP}>
        <span className={classes(
          HOVER_SPAN,
          PREVIOUS_MONTH,
          areArrowControlsDisabled && DISABLED
        )}
        >
          <i className={classes(materialIconsClass, ICON_CHEVRON_LEFT)}/>
        </span>
        <span className={classes(
          HOVER_SPAN,
          HEADER_MONTH,
          mode === MONTHS && SELECTED
        )}
        >
          {monthName}
        </span>
        <span className={classes(
          HOVER_SPAN,
          NEXT_MONTH,
          areArrowControlsDisabled && DISABLED
        )}
        >
          <i className={classes(materialIconsClass, ICON_CHEVRON_RIGHT)}/>
        </span>
      </div>
      <div className={HEADER_GROUP}>
        <span className={classes(
          HOVER_SPAN,
          PREVIOUS_YEAR,
          areArrowControlsDisabled && DISABLED
        )}
        >
          <i className={classes(materialIconsClass, ICON_CHEVRON_LEFT)}/>
        </span>
        <span className={classes(
          HOVER_SPAN,
          HEADER_YEAR,
          mode === YEARS && SELECTED
        )}
        >
          {year}
        </span>
        <span className={classes(
          HOVER_SPAN,
          NEXT_YEAR,
          areArrowControlsDisabled && DISABLED
        )}
        >
          <i className={classes(materialIconsClass, ICON_CHEVRON_RIGHT)}/>
        </span>
      </div>
    </div>
  );
};

const MainBody = ({
  year,
  month,
  selected,
  date,
  mode,
  onClockScroll,
  isDayDisabled,
  isMonthDisabled,
  isYearDisabled,
  materialIconsClass,
  isPreviousHourDisabled,
  isPreviousMinuteDisabled
}) => {
  if (mode === DAYS) {
    return <Month {...{year, month, selected, isDayDisabled}} />;
  }
  if (mode === MONTHS) {
    return (
      <SelectMonth
        selectedMonth={date ? date.getMonth() : null}
        isMonthDisabled={isMonthDisabled}
      />
    );
  }
  if (mode === YEARS) {
    return (
      <SelectYear
        year={year}
        selectedYear={date ? date.getFullYear() : null}
        isYearDisabled={isYearDisabled}
      />
    );
  }
  if (mode === TIME) {
    const dateForTime = date ? date : new Date();
    return (
      <Time
        hours={dateForTime.getHours()}
        minutes={dateForTime.getMinutes()}
        selectedDate={dateForTime}
        onClockScroll={onClockScroll}
        materialIconsClass={materialIconsClass}
        isPreviousHourDisabled={isPreviousHourDisabled}
        isPreviousMinuteDisabled={isPreviousMinuteDisabled}
      />
    );
  }
  return null;
};

const Footer = ({ mode, useTimePicker, isTodayDisabled }) => {
  return (
    <div className={FOOTER_ROW}>
      {useTimePicker && (
        <span className={classes(HOVER_SPAN, SELECT_TIME)}>
          { mode === TIME ? 'Date' : 'Time' }
        </span>
      )}
      <span className={
        classes(HOVER_SPAN, SELECT_TODAY, isTodayDisabled && DISABLED)
      }
      >
        Today
      </span>
      <span className={classes(HOVER_SPAN, CLEAR_SELECTION)}>
        Clear
      </span>
    </div>
  );
};

class DateTimePicker extends React.Component {
  constructor (props) {
    super(props);
    const referenceDate = this.props.date ? this.props.date : new Date();
    this.state = {
      mode: DAYS,
      displayMonth: referenceDate.getMonth(),
      displayYear: referenceDate.getFullYear(),
      selectedDate: referenceDate.getDate(),
    };
    this.onClick = this.onClick.bind(this);
  }

  isDateAllowed(date) {
    const minDate = this.getMinDate();
    if (!minDate) {
      return true;
    }
    return !isBefore(date, minDate);
  }

  getMinDate() {
    const config = this.props.config;
    return config && config.minDate ? config.minDate : null;
  }

  getDateModifiedByMonthSelection(monthIndex) {
    const date = this.props.date ? new Date(this.props.date) : new Date();
    date.setFullYear(this.state.displayYear);
    this.setMonth(date, monthIndex);
    return date;
  }

  getDateModifiedByYearSelection(year) {
    const date = this.props.date ? new Date(this.props.date) : new Date();
    date.setMonth(this.state.displayMonth);
    this.setYear(date, year);
    return date;
  }

  getDateModifiedByHourDelta(delta) {
    const date = this.props.date ? new Date(this.props.date) : new Date();
    date.setFullYear(this.state.displayYear);
    date.setMonth(this.state.displayMonth);
    date.setHours(date.getHours() + delta);
    return date;
  }

  getDateModifiedByMinuteDelta(delta) {
    const date = this.props.date ? new Date(this.props.date) : new Date();
    let minutes = date.getMinutes();
    if (minutes % 15 !== 0) {
      minutes = Math.round(minutes / 15) * 15;
    }
    date.setFullYear(this.state.displayYear);
    date.setMonth(this.state.displayMonth);
    date.setMinutes(minutes + delta);
    return date;
  }

  modifyDisplayYearByDelta(delta) {
    this.setState(prevState => ({
      displayYear: Math.max(0, prevState.displayYear + delta)
    }));
  }

  modifyDisplayMonthByDelta(delta) {
    const date = this.props.date ? new Date(this.props.date) : new Date();
    date.setFullYear(this.state.displayYear);
    this.setMonth(date, this.state.displayMonth + delta);
    this.setState({
      displayMonth: date.getMonth(),
      displayYear: date.getFullYear()
    });
  }

  modifyHoursByDelta(delta) {
    const date = this.getDateModifiedByHourDelta(delta);
    this.props.onChange(date);
  }

  modifyMinutesByDelta(delta) {
    const date = this.getDateModifiedByMinuteDelta(delta);
    this.props.onChange(date);
  }

  onClick (event) {
    const {target, className, isDisabled} = targetManager.getTarget(event);

    if (isDisabled) {
      return;
    }

    switch (className) {
    case SELECT_DAY: {
      const date = this.props.date ? new Date(this.props.date) : new Date();
      date.setFullYear(this.state.displayYear);
      date.setMonth(this.state.displayMonth);
      date.setDate(Number.parseInt(target.textContent, 10));
      this.setState({selectedDate: date.getDate()});
      this.props.onChange(date);
      break;
    }

    case NEXT_MONTH:
      this.modifyDisplayMonthByDelta(1);
      break;
    case PREVIOUS_MONTH:
      this.modifyDisplayMonthByDelta(-1);
      break;

    case NEXT_YEAR:
      this.modifyDisplayYearByDelta(1);
      break;
    case PREVIOUS_YEAR:
      this.modifyDisplayYearByDelta(-1);
      break;

    case HEADER_MONTH:
      this.setState(
        prevState => ({mode: prevState.mode === MONTHS ? DAYS : MONTHS}));
      break;

    case HEADER_YEAR:
      this.setState(
        prevState => ({mode: prevState.mode === YEARS ? DAYS : YEARS}));
      break;

    case SELECT_MONTH: {
      const selectedMonthIndex = Number.parseInt(target.dataset.month, 10);
      const date = this.getDateModifiedByMonthSelection(selectedMonthIndex);
      this.setState({mode: DAYS, displayMonth: date.getMonth()});
      this.props.onChange(date);
      break;
    }

    case SELECT_TIME:
      this.setState(
        prevState => ({mode: prevState.mode === TIME ? DAYS : TIME}));
      break;

    case SELECT_YEAR: {
      const selectedYear = Number.parseInt(target.textContent, 10);
      const date = this.getDateModifiedByYearSelection(selectedYear);
      this.setState({
        mode: DAYS,
        displayYear: date.getFullYear()
      });
      this.props.onChange(date);
      break;
    }

    case NEXT_HOUR:
    case PREVIOUS_HOUR: {
      const delta = className === PREVIOUS_HOUR ? -1 : 1;
      this.modifyHoursByDelta(delta);
      break;
    }

    case NEXT_MINUTE:
    case PREVIOUS_MINUTE: {
      const delta = className === PREVIOUS_MINUTE ? -15 : 15;
      this.modifyMinutesByDelta(delta);
      break;
    }

    case SELECT_CALENDAR:
      this.setState({mode: DAYS});
      break;

    case SELECT_TODAY: {
      const date = new Date();
      this.setState({
        displayMonth: date.getMonth(),
        displayYear: date.getFullYear()
      });
      this.props.onChange(date);
      break;
    }

    case CLEAR_SELECTION: {
      const date = new Date();
      this.setState({
        displayMonth: date.getMonth(),
        displayYear: date.getFullYear()
      });
      this.props.onChange(null);
      break;
    }

    default:
    }
  }

  setYear (date, year) {
    const month = date.getMonth();
    date.setFullYear(year);
    this.retainMonthAndSelectedDate(date, month);
  }

  setMonth (date, month) {
    date.setMonth(month);
    this.retainMonthAndSelectedDate(date, month);
  }

  retainMonthAndSelectedDate (date, month) {
    while (month < 0) {
      month = (month + 12) % 12;
    }
    if (date.getMonth() > month) {
      while (date.getMonth() > month) {
        date.setDate(date.getDate() - 1);
      }
    } else if (date.getDate() < this.state.selectedDate) {
      const testDate = new Date(date);
      while (date.getDate() < this.state.selectedDate) {
        testDate.setDate(date.getDate() + 1);
        if (date.getMonth() === testDate.getMonth()) {
          date.setDate(date.getDate() + 1);
        } else {
          break;
        }
      }
    }
  }

  render() {
    const year = this.state.displayYear;
    const month = this.state.displayMonth;
    const selected = this.props.date ?
      {
        year: this.props.date.getFullYear(),
        month: this.props.date.getMonth(),
        day: this.props.date.getDate(),
      } :
      null;
    const config = this.props.config;
    const materialIconsClass = config && config.materialIconsClass ?
      config.materialIconsClass :
      MATERIAL_ICONS;
    const containerStyle = config && config.containerStyle ?
      config.containerStyle :
      {};
    return (
      <div
        ref={this.props.forwardedRef}
        className={ROOT}
        onClick={this.onClick}
        style={containerStyle}
      >
        <Header
          monthName={MONTH_NAMES_SHORT[month]}
          year={year}
          mode={this.state.mode}
          areArrowControlsDisabled={this.state.mode !== DAYS}
          materialIconsClass={materialIconsClass}
        />
        <div
          className={classes(MAIN_SECTION, modeViewsMap.get(this.state.mode))}
        >
          <MainBody
            year={year}
            month={month}
            selected={selected}
            date={this.props.date}
            mode={this.state.mode}
            onClockScroll={date => {
              if (!this.isDateAllowed(date)) {
                return;
              }
              this.props.onChange(date);
            }}
            isDayDisabled={date => !this.isDateAllowed(date)}
            isMonthDisabled={potentialMonthIndex =>
              !this.isDateAllowed(
                this.getDateModifiedByMonthSelection(potentialMonthIndex)
              )}
            isYearDisabled={potentialYear =>
              !this.isDateAllowed(
                this.getDateModifiedByYearSelection(potentialYear)
              )}
            materialIconsClass={materialIconsClass}
            isPreviousHourDisabled={
              !this.isDateAllowed(this.getDateModifiedByHourDelta(-1))
            }
            isPreviousMinuteDisabled={
              !this.isDateAllowed(this.getDateModifiedByMinuteDelta(-15))
            }
          />
        </div>
        <Footer
          mode={this.state.mode}
          useTimePicker={Boolean(config && config.useTimePicker)}
          isTodayDisabled={!this.isDateAllowed(new Date())}
        />
      </div>
    );
  }
}

DateTimePicker.propTypes = {
  date: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
  config: PropTypes.object,
  forwardedRef: PropTypes.any
};

function DateTimePickerWithRef(props, ref) {
  return <DateTimePicker forwardedRef={ref} {...props} />;
}

export default forwardRef(DateTimePickerWithRef);
