import {range} from '../../core/functions/utils';
import {parse} from '../../core/functions/parse';

export function initTable($root, {colState, rowState, dataState}) {
  if (colState) {
    Object.keys(colState).forEach(id => {
      $root.findAll(`[data-col="${id}"]`)
          .forEach(cell => {
            cell.style.width = colState[id] + 'px';
          });
    });
  }
  if (rowState) {
    Object.keys(rowState).forEach(id => {
      $root.findAll(`[data-row="${id}"]`)
          .forEach(row => {
            row.style.height = rowState[id] + 'px';
          });
    });
  }
  if (dataState) {
    Object.keys(dataState).forEach(id => {
      $root.find(`[data-id="${id}"]`).textContent(parse(dataState[id]));
    });
  }
}

export function matrix($target, $current) {
  const target = $target.getDataID(true);
  const current = $current.getDataID(true);
  const cols = range(current.col, target.col);
  const rows = range(current.row, target.row);

  return cols.reduce((acc, col) => {
    rows.forEach(row => acc.push(`${row}:${col}`));
    return acc;
  }, []);
}

export function nextSelector(key, {col, row}) {
  const minValue = 0;
  const maxValue = 100;
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row = (row + 1 > maxValue - 1) ? maxValue - 1 : row + 1;
      break;
    case 'Tab':
    case 'ArrowRight':
      col = (col + 1 > 25) ? 25 : col + 1;
      break;
    case 'ArrowLeft':
      col = (col - 1 < minValue) ? minValue : col - 1;
      break;
    case 'ArrowUp':
      row = (row - 1 < minValue) ? minValue : row - 1;
      break;
  }
  return `[data-id="${row}:${col}"]`;
}
