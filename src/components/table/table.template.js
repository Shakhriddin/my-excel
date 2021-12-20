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

function createCell(row) {
  return function toCell(_, col) {
    return `
    <div class="table__cell" data-col="${col}" data-id="${row}:${col}"
    contenteditable="true"  spellcheck="false" tabindex="${row}"></div>
  `;
  };
}

function createRow(rowIndex, content) {
  return `
   <div class="table__row" data-type="resizable">
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

export function createTable(rowsCount = 15) {
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
        .map(createCell(row))
        .join('');
    rows.push(createRow(row + 1, cells));
  }

  return rows.join('');
}
