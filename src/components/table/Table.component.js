import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';
import {resizerHandler} from './table.resize';
import {TableSelection} from './TableSelection';
import {$} from '../../core/dom';
import {initTable, matrix, nextSelector} from './table.function';
import * as actions from '../../redux/actions';
import {defaultStyles} from '../../constants';
import {parse} from '../../core/parse';


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
    return createTable(100, this.store.getState());
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    initTable(this.$root, this.store.getState());

    this.selectCell(this.$root.find('[data-id="0:0"]'));

    this.$subscribe('FormulaComponent:input', (value) => {
      this.selection.current.attribute('data-value', value)
          .textContent(parse(value));
      this.updateTextInStore(value);
    });

    this.$subscribe('FormulaComponent:done', () => {
      this.selection.select(
          this.$root.find(
              nextSelector('Enter', this.selection.current.getDataID(true)),
          ),
      );
    });

    this.$subscribe('ToolbarComponent:click', value => {
      this.selection.applyStyle(value);
      this.$dispatch(actions.applyStyles({
        value,
        ids: this.selection.selectedIds,
      }))
      ;
    });
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('TableComponent:select',
        $cell);

    this.$dispatch(
        actions.changeStyles($cell.getStyles(Object.keys(defaultStyles))),
    );
  }

  async tableResize(event) {
    try {
      const data = await resizerHandler(this.$root, event);
      this.$dispatch(actions.tableResize(data));
    } catch (error) {
      console.warn('Resize Error', error.message);
    }
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      this.tableResize(event);
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

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.getDataID(),
      value,
    }));
  }

  onInput(event) {
    this.updateTextInStore($(event.target).textContent());
  }
}
