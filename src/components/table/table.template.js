import {toInlineStyles} from '../../core/functions/utils';
import {defaultStyles} from '../../constants';

const CODES = {
  A: 65,
  Z: 90,
};

function createColumn(col, index) {
  return `<div class="table__column" data-type="resizable" data-col="${index}">
      ${col}
      <div class="table__col-resize" data-resize="col"></div>
    </div>`;
}

function createCell(row, state) {
  return function toCell(_, col) {
    const id = `${row}:${col}`;
    const data = state.dataState[id];
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id],
    });
    return `
    <div 
    class="table__cell" 
    data-col="${col}" 
    data-id="${id}"
    data-value="${data || ''}"
    contenteditable="true" 
    spellcheck="false" 
    tabindex="${row}"
    style="${styles}"
    >
    </div>
  `;
  };
}

function createRow(rowIndex, content) {
  return `
   <div class="table__row" data-type="resizable" 
    ${rowIndex ? `data-row="${rowIndex - 1}"` : ''}>
     <div class="table__line-number">
        ${rowIndex
    ? rowIndex + `<div class="table__row-resize" data-resize="row"></div>`
    : ''}
      </div>
     <div class="table__data">${content}</div>
  </div>
  `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 15, state = {}) {
  const columnsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(columnsCount)
      .fill('')
      .map(toChar)
      .map(createColumn)
      .join('');

  rows.push(createRow(null, cols));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(columnsCount)
        .fill('')
        .map(createCell(row, state))
        .join('');
    rows.push(createRow(row + 1, cells));
  }

  return rows.join('');
}

