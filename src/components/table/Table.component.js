import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';
import {resizerHandler} from './table.resize';

export class TableComponent extends ExcelComponent {
  static ClassName = ['excel__table', 'table'];

  constructor($root) {
    super($root, {
      name: 'TableComponent',
      listeners: ['mousedown'],
    });
  }

  toHTML() {
    return createTable(100);
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      resizerHandler(this.$root, event);
    }
  }
}
