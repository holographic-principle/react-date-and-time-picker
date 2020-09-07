import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {classes, getDefaultLineHeight, range} from './utils';
import classNames from './classNames';
import {TRACK_PAD_SCROLL_THRESHOLD} from './consts';

const {
  TABLE,
  HOVER_SPAN,
  SELECT_YEAR,
  MATERIAL_ICONS,
  ICON_EXPAND_LESS,
  ICON_EXPAND_MORE
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

const PreviousYearPageControls = ({ onClick, materialIconsClass }) => {
  return (
    <div>
      <span className={HOVER_SPAN} onClick={onClick}>
        <i className={classes(materialIconsClass, ICON_EXPAND_LESS)} />
      </span>
    </div>
  );
};

const NextYearPageControls = ({ onClick, materialIconsClass }) => {
  return (
    <div>
      <span className={HOVER_SPAN} onClick={onClick}>
        <i className={classes(materialIconsClass, ICON_EXPAND_MORE)} />
      </span>
    </div>
  );
};

const SelectYear = ({ year: startYear, config }) => {
  const deltaY = useRef(0);
  const [deltaYear, setDeltaYear] = useState(0);

  const onWheel = (event) => {
    deltaY.current += event.deltaY * (
      event.deltaMode === WheelEvent.DOM_DELTA_LINE ?
        getLineHeight() :
        1
    );
    if (Math.abs(deltaY.current) < TRACK_PAD_SCROLL_THRESHOLD) {
      return;
    }
    deltaY.current = 0;
    const delta = event.deltaY > 0 ? 3 : -3;
    setDeltaYear(deltaYear + delta);
  };

  const rows = [];
  let row;
  Array.from(
    range(startYear + deltaYear + 5, startYear + deltaYear - 4)
  ).forEach((year, index) => {
    if (index % 3 === 0) {
      rows.push(row = []);
    }
    row.push(
      <td key={index} className={SELECT_YEAR}>
        <span className={HOVER_SPAN}>{year}</span>
      </td>
    );
  });

  const materialIconsClass = config && config.materialIconsClass ?
    config.materialIconsClass :
    MATERIAL_ICONS;

  return (
    <>
      <PreviousYearPageControls
        materialIconsClass={materialIconsClass}
        onClick={() => setDeltaYear(deltaYear - 9)}
      />
      <table className={TABLE} onWheel={onWheel}>
        <tbody>{rows.map((tableRow, index) =>
          <tr key={index}>{tableRow}</tr>)}
        </tbody>
      </table>
      <NextYearPageControls
        materialIconsClass={materialIconsClass}
        onClick={() => setDeltaYear(deltaYear + 9)}
      />
    </>
  );
};

SelectYear.propTypes = {
  year: PropTypes.number,
  config: PropTypes.object
};

export default SelectYear;
