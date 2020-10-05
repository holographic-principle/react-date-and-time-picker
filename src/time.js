import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import classNames from './classNames';
import {classes, getDefaultLineHeight} from './utils';
import {TRACK_PAD_SCROLL_THRESHOLD} from './consts';

const {
  TIME_CONTAINER,
  TIME_CONTROLS,
  CLOCK,
  CLOCK_HOURS,
  CLOCK_MINUTES,
  HOVER_SPAN,
  DISABLED,
  NEXT_HOUR,
  PREVIOUS_HOUR,
  NEXT_MINUTE,
  PREVIOUS_MINUTE,
  ICON_EXPAND_LESS,
  ICON_EXPAND_MORE,
} = classNames;

const getLineHeight = (() => {
  let lineHeight = 0;
  return () => {
    if (lineHeight === 0) {
      lineHeight = getDefaultLineHeight() || 18;
    }
    return lineHeight;
  };
})();

const TopControls = ({ materialIconsClass }) => {
  return (
    <div className={TIME_CONTROLS}>
      <span className={classes(HOVER_SPAN, NEXT_HOUR)}>
        <i className={classes(materialIconsClass, ICON_EXPAND_LESS)} />
      </span>
      <span className={classes(HOVER_SPAN, NEXT_MINUTE)}>
        <i className={classes(materialIconsClass, ICON_EXPAND_LESS)} />
      </span>
    </div>
  );
};

const BottomControls = ({
  materialIconsClass,
  isPreviousHourDisabled,
  isPreviousMinuteDisabled
}) => {
  return (
    <div className={TIME_CONTROLS}>
      <span className={classes(
        HOVER_SPAN,
        PREVIOUS_HOUR,
        isPreviousHourDisabled && DISABLED
      )}
      >
        <i className={classes(materialIconsClass, ICON_EXPAND_MORE)} />
      </span>
      <span className={classes(
        HOVER_SPAN,
        PREVIOUS_MINUTE,
        isPreviousMinuteDisabled && DISABLED
      )}
      >
        <i className={classes(materialIconsClass, ICON_EXPAND_MORE)} />
      </span>
    </div>
  );
};

const Clock = ({ hours, minutes }) => {
  return (
    <div className={CLOCK}>
      <div className={CLOCK_HOURS}>
        {String.prototype.padStart.call(String(hours), 2, '0')}
      </div>
      <span>:</span>
      <div className={CLOCK_MINUTES}>
        {String.prototype.padStart.call(String(minutes), 2, '0')}
      </div>
    </div>
  );
};

const Time = ({
  hours,
  minutes,
  selectedDate,
  onClockScroll,
  materialIconsClass,
  isPreviousHourDisabled,
  isPreviousMinuteDisabled
}) => {
  const timeContainerRef = useRef(null);
  const deltaY = useRef(0);

  const onWheel = (event) => {
    if (!timeContainerRef.current) {
      return;
    }
    deltaY.current += event.deltaY * (
      event.deltaMode === WheelEvent.DOM_DELTA_LINE ?
        getLineHeight() :
        1
    );
    if (Math.abs(deltaY.current) < TRACK_PAD_SCROLL_THRESHOLD) {
      return;
    }
    deltaY.current = 0;
    const box = timeContainerRef.current.getBoundingClientRect();
    const delta = event.deltaY > 0 ? -1 : 1;
    const date = new Date(selectedDate);
    if (event.clientX < (box.left + box.width / 2)) {
      date.setHours(date.getHours() + delta);
    } else {
      date.setMinutes(date.getMinutes() + delta);
    }
    onClockScroll(date);
  };

  return (
    <div ref={timeContainerRef} className={TIME_CONTAINER} onWheel={onWheel}>
      <div>
        <TopControls materialIconsClass={materialIconsClass} />
        <Clock hours={hours} minutes={minutes} />
        <BottomControls
          materialIconsClass={materialIconsClass}
          isPreviousHourDisabled={isPreviousHourDisabled}
          isPreviousMinuteDisabled={isPreviousMinuteDisabled}
        />
      </div>
    </div>
  );
};

Time.propTypes = {
  hours: PropTypes.number,
  minutes: PropTypes.number,
  selectedDate: PropTypes.instanceOf(Date),
  onClockScroll: PropTypes.func,
  materialIconsClass: PropTypes.string,
  isPreviousHourDisabled: PropTypes.bool,
  isPreviousMinuteDisabled: PropTypes.bool
};

export default Time;
