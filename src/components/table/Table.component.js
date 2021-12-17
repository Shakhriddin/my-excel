import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';

export class TableComponent extends ExcelComponent {
  static ClassName = ['excel__table', 'table'];
  s;

  toHTML() {
    return createTable(100);
  }
}
