import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';
import {resizerHandler} from './table.resize';
import {TableSelection} from './TableSelection';
import {$} from '../../core/dom';
import {matrix, nextSelector} from './table.function';

export class TableComponent extends ExcelComponent {
  static ClassName = ['excel__table', 'table'];

  constructor($root, options) {
    super($root, {
      name: 'TableComponent',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
  }

  toHTML() {
    return createTable(100);
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();
    this.selectCell(this.$root.find('[data-id="0:0"]'));
    this.$subscribe('FormulaComponent:input', (text) => {
      this.selection.current.textContent(text);
    });
    this.$subscribe('FormulaComponent:done', () => {
      this.selection.select(
          this.$root.find(
              nextSelector('Enter', this.selection.current.getDataID(true)),
          ),
      );
    });
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('TableComponent:select',
        $cell);
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      resizerHandler(this.$root, event);
    } else if (event.target.dataset.id) {
      const $cell = $(event.target);
      if (event.shiftKey) {
        this.selection.selectGroup(
            matrix($cell, this.selection.current)
                .map(id => this.$root.find(`[data-id="${id}"]`)));
      } else {
        this.selection.select($cell);
        this.selectCell($cell);
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
    ];
    const {key} = event;
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const $next = this.$root.find(
          nextSelector(key, this.selection.current.getDataID(true)),
      );
      this.selectCell($next);
    }
  }

  onInput(event) {
    this.$emit('TableComponent:select', this.selection.current);
  }
}
