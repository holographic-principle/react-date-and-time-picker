import React from 'react';
import {MONTH_NAMES_SHORT} from './ui_strings';
import classNames from './classNames';
import {classes} from './utils';

const {
  TABLE,
  HOVER_SPAN,
  SELECT_MONTH,
  SELECTED_MONTH
} = classNames;

const SelectMonth = ({ selectedMonth }) => {
  const rows = [];
  let row;
  MONTH_NAMES_SHORT.forEach((name, index) => {
    if (index % 3 === 0) {
      row = [];
      rows.push(row);
    }
    row.push(
      <td key={index}
        data-month={String(index)}
        className={
          classes(SELECT_MONTH, selectedMonth === index && SELECTED_MONTH)}
      >
        <span className={HOVER_SPAN}>{name}</span>
      </td>
    );
  });
  return (
    <table className={TABLE}>
      <tbody>
        {rows.map((tableRow, index) => <tr key={index}>{tableRow}</tr>)}
      </tbody>
    </table>
  );
};

export default SelectMonth;
