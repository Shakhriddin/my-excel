const CODES = {
  A: 65,
  Z: 90,
};


function createColumn(col) {
  return `<div class="table__column">${col}</div>`;
}

function createCell() {
  return `<div class="table__cell" contenteditable="true"></div>`;
}

function createRow(rowIndex, content) {
  return `
   <div class="table__row">
     <div class="table__info">${rowIndex ? rowIndex : ''}</div>
     <div class="table__data">${content}</div>
  </div>
  `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 15) {
  const columnsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(columnsCount)
      .fill('')
      .map(toChar)
      .map(createColumn)
      .join('');

  rows.push(createRow(null, cols));

  for (let index = 0; index < rowsCount; index++) {
    const cells = new Array(columnsCount)
        .fill('')
        .map(createCell)
        .join('');
    rows.push(createRow(index + 1, cells));
  }

  return rows.join('');
}
