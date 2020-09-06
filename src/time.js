import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import classNames from './classNames';
import {classes, getDefaultLineHeight} from './utils';
import Digit from './digit';
import {TRACK_PAD_SCROLL_THRESHOLD} from './consts';

const {
  TIME_CONTAINER,
  TIME_CONTROLS,
  HOVER_SPAN,
  NEXT_HOUR,
  PREVIOUS_HOUR,
  NEXT_MINUTE,
  PREVIOUS_MINUTE,
  ICON_EXPAND_LESS,
  ICON_EXPAND_MORE,
  MATERIAL_ICONS,
  DIGITS,
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

const Controls = ({next, previous, materialIconsClass}) =>
  <div className={TIME_CONTROLS}>
    <span className={classes(HOVER_SPAN, previous)}>
      <i className={classes(materialIconsClass, ICON_EXPAND_LESS)} />
    </span>
    <span className={classes(HOVER_SPAN, next)}>
      <i className={classes(materialIconsClass, ICON_EXPAND_MORE)} />
    </span>
  </div>
;

Controls.propTypes = {
  next: PropTypes.string,
  previous: PropTypes.string,
  materialIconsClass: PropTypes.string,
};

const Time = ({hours, minutes, selectedDate, onChange, config}) => {
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
    const delta = event.deltaY > 0 ? 1 : -1;
    const date = new Date(selectedDate);
    if (event.clientX < (box.left + box.width / 2)) {
      date.setHours(date.getHours() + delta);
    } else {
      date.setMinutes(date.getMinutes() + delta);
    }
    onChange(date);
  };

  const materialIconsClass = config && config.materialIconsClass ?
    config.materialIconsClass :
    MATERIAL_ICONS;

  return (
    <div ref={timeContainerRef} className={TIME_CONTAINER} onWheel={onWheel}>
      <Controls
        previous={PREVIOUS_HOUR}
        next={NEXT_HOUR}
        materialIconsClass={materialIconsClass}
      />
      <svg viewBox="0 0 140 51"
        width="140px"
        height="51px"
        className={DIGITS}
      >
        <defs>
          <path id="dtp-digit-light"
            d="M 0 0 L 2.5 2.5 17.5 2.5 20 0 17.5 -2.5 2.5 -2.5 Z"
          />
        </defs>
        <g>
          <Digit digit={(hours / 10) | 0} pos={1}/>
          <Digit digit={hours % 10} pos={0}/>
        </g>
        <g transform="translate(70, 2)">
          <circle cx="0" r="2" cy="13" />
          <circle cx="0" r="2" cy="34" />
        </g>
        <g transform="translate(82, 0)">
          <Digit digit={(minutes / 10) | 0} pos={1}/>
          <Digit digit={minutes % 10} pos={0}/>
        </g>
      </svg>
      <Controls
        previous={PREVIOUS_MINUTE}
        next={NEXT_MINUTE}
        materialIconsClass={materialIconsClass}
      />
    </div>
  );
};

Time.propTypes = {
  hours: PropTypes.number,
  minutes: PropTypes.number,
  selectedDate: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
  config: PropTypes.object,
};

export default Time;
