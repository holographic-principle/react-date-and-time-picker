import React from 'react';
import PropTypes from 'prop-types';
import {MONTH_NAMES} from './ui_strings';
import {classes, Enum, TargetManager, getDefaultLineHeight} from './utils';
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
  PREVIOUS_MONTH,
  PREVIOUS_HOUR,
  PREVIOUS_MINUTE,
  NEXT_MONTH,
  NEXT_HOUR,
  NEXT_MINUTE,
  CLEAR_SELECTION,
  VIEW_DAYS,
  VIEW_MONTHS,
  VIEW_YEARS,
  VIEW_TIME,
  FILLER,
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
    NEXT_MONTH,
    NEXT_HOUR,
    NEXT_MINUTE,
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

const TRACK_PAD_SCROLL_THRESHOLD = 25;

const getLineHeight = (() => {
  let lineHeight = 0;
  return () => {
    if (lineHeight === 0) {
      lineHeight = getDefaultLineHeight() || 18;
    }
    return lineHeight;
  };
})();

const Footer = ({ mode, useTimePicker }) => {
  return (
    <div className={FOOTER_ROW}>
      {useTimePicker && (
        <span className={classes(HOVER_SPAN, SELECT_TIME)}>
          { mode === TIME ? 'Date' : 'Time' }
        </span>
      )}
      <span className={classes(HOVER_SPAN, SELECT_TODAY)}>
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
    this.state = {
      mode: DAYS,
      deltaYear: 0,
      displayMonth: this.props.date.getMonth(),
      displayYear: this.props.date.getFullYear(),
      selectedDate: this.props.date.getDate(),
    };
    this.onClick = this.onClick.bind(this);
    this.onWheel = this.onWheel.bind(this);
    this._pickerBody = null;
    this._deltaY = 0;
  }

  modifyMonthByDelta(delta) {
    const date = new Date(this.props.date);
    date.setFullYear(this.state.displayYear);
    this.setMonth(date, this.state.displayMonth + delta);
    this.setState({
      displayMonth: date.getMonth(),
      displayYear: date.getFullYear()
    });
  }

  modifyYearByDelta(delta) {
    this.setState(
      (prevState) => ({deltaYear: prevState.deltaYear + delta}));
  }

  modifyMinutesByDelta(delta) {
    const date = new Date(this.props.date);
    let minutes = date.getMinutes();
    if (minutes % 15 !== 0) {
      minutes = Math.round(minutes / 15) * 15;
    }
    date.setMinutes(minutes + delta);
    this.props.onChange(date);
  }

  showPreviousMonth() {
    if (this.state.mode === DAYS) {
      const delta = -1;
      this.modifyMonthByDelta(delta);
      return;
    }
    if (this.state.mode === YEARS) {
      const delta = -9;
      this.modifyYearByDelta(delta);
      return;
    }
    if (this.state.mode === TIME) {
      const delta = -15;
      this.modifyMinutesByDelta(delta);
    }
  }

  showNextMonth() {
    if (this.state.mode === DAYS) {
      const delta = 1;
      this.modifyMonthByDelta(delta);
      return;
    }
    if (this.state.mode === YEARS) {
      const delta = 9;
      this.modifyYearByDelta(delta);
      return;
    }
    if (this.state.mode === TIME) {
      const delta = 15;
      this.modifyMinutesByDelta(delta);
    }
  }

  onClick (event) {
    const {target, className} = targetManager.getTarget(event);

    switch (className) {
    case SELECT_DAY: {
      const date = new Date(this.props.date);
      date.setFullYear(this.state.displayYear);
      date.setMonth(this.state.displayMonth);
      date.setDate(Number.parseInt(target.textContent, 10));
      this.setState({selectedDate: date.getDate()});
      this.props.onChange(date);
      break;
    }

    case NEXT_MONTH:
      this.showNextMonth();
      break;
    case PREVIOUS_MONTH:
      this.showPreviousMonth();
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
      const date = new Date(this.props.date);
      date.setFullYear(this.state.displayYear);
      this.setMonth(date, Number.parseInt(target.dataset.month, 10));
      this.setState({mode: DAYS, displayMonth: date.getMonth()});
      break;
    }

    case SELECT_TIME:
      this.setState(
        prevState => ({mode: prevState.mode === TIME ? DAYS : TIME}));
      break;

    case SELECT_YEAR: {
      const date = new Date(this.props.date);
      date.setMonth(this.state.displayMonth);
      this.setYear(date, Number.parseInt(target.textContent, 10));
      this.setState({
        mode: DAYS,
        deltaYear: 0,
        displayYear: date.getFullYear()
      });
      break;
    }

    case NEXT_HOUR:
    case PREVIOUS_HOUR: {
      const delta = className === PREVIOUS_HOUR ? -1 : 1;
      const date = new Date(this.props.date);
      date.setHours(date.getHours() + delta);
      this.props.onChange(date);
      break;
    }

    case NEXT_MINUTE:
    case PREVIOUS_MINUTE: {
      const delta = className === PREVIOUS_MINUTE ? -1 : 1;
      const date = new Date(this.props.date);
      date.setMinutes(date.getMinutes() + delta);
      this.props.onChange(date);
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

  onWheel (event) {
    this._deltaY += event.deltaY * (
      event.deltaMode === WheelEvent.DOM_DELTA_LINE ?
        getLineHeight() :
        1
    );
    if (Math.abs(this._deltaY) < TRACK_PAD_SCROLL_THRESHOLD) {
      return;
    }
    this._deltaY = 0;
    switch (this.state.mode) {
    case YEARS: {
      const delta = event.deltaY > 0 ? 3 : -3;
      this.setState(
        (prevState) => ({deltaYear: prevState.deltaYear + delta}));
      break;
    }

    case TIME: {
      const box = this._pickerBody.getBoundingClientRect();
      const delta = event.deltaY > 0 ? 1 : -1;
      const date = new Date(this.props.date);
      if (event.clientX < (box.left + box.width / 2)) {
        date.setHours(date.getHours() + delta);
      } else {
        date.setMinutes(date.getMinutes() + delta);
      }
      this.props.onChange(date);
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

  getBody (year, month, selected) {
    switch (this.state.mode) {
    case DAYS:
      return <Month {...{year, month, selected}} />;

    case MONTHS:
      return <SelectMonth />;

    case YEARS:
      return <SelectYear year={year + this.state.deltaYear} />;

    case TIME:
      return (
        <Time
          hours={this.props.date.getHours()}
          minutes={this.props.date.getMinutes()}
          config={this.props.config}
        />
      );
    default:

    }
  }

  render() {
    const year = this.state.displayYear;
    const month = this.state.displayMonth;
    const selected = {
      year: this.props.date.getFullYear(),
      month: this.props.date.getMonth(),
      day: this.props.date.getDate(),
    };
    const config = this.props.config;
    const materialIconsClass = config && config.materialIconsClass ?
      config.materialIconsClass :
      MATERIAL_ICONS;
    const containerStyle = config && config.containerStyle ?
      config.containerStyle :
      {};
    return (
      <div className={ROOT}
        onClick={this.onClick}
        onWheel={this.onWheel}
        style={containerStyle}
      >
        <Header
          monthName={MONTH_NAMES[month]}
          year={year}
          mode={this.state.mode}
          materialIconsClass={materialIconsClass}
        />
        <div ref={div => {this._pickerBody = div;}}
          className={classes(MAIN_SECTION, modeViewsMap.get(this.state.mode))}
        >
          {this.getBody(year, month, selected)}
        </div>
        <Footer
          mode={this.state.mode}
          useTimePicker={Boolean(config && config.useTimePicker)}
        />
      </div>
    );
  }
}

const Header = ({ monthName, year, mode, materialIconsClass }) => {
  return (
    <div className={HEADER_ROW}>
      <span className={classes(HOVER_SPAN, PREVIOUS_MONTH)}>
        <i className={classes(materialIconsClass, ICON_CHEVRON_LEFT)}/>
      </span>
      <span className={FILLER}/>
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
        HEADER_YEAR,
        mode === YEARS && SELECTED
      )}
      >
        {year}
      </span>
      <span className={FILLER}/>
      <span className={classes(HOVER_SPAN, NEXT_MONTH)}>
        <i className={classes(materialIconsClass, ICON_CHEVRON_RIGHT)}/>
      </span>
    </div>
  );
};

DateTimePicker.propTypes = {
  date: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
  config: PropTypes.object,
};

export default DateTimePicker;
