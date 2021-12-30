import {$} from '../../core/dom';
import {defaultStyles} from '../../constants';
import {ExcelStateComponent} from '../../core/ExcelStateComponent';
import {createToolbar} from './Toolbar.template';

export class ToolbarComponent extends ExcelStateComponent {
  static ClassName = ['excel__toolbar', 'toolbar', 'container'];

  constructor($root, options) {
    super($root, {
      name: 'ToolbarComponent',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options,
    });
  }

  prepare() {
    this.initState(defaultStyles);
  }

  get template() {
    return createToolbar(this.state);
  }

  toHTML() {
    return this.template;
  }

  storeChanged(changes) {
    this.setState(changes.currentStyles);
  }

  onClick(event) {
    const $target = $(event.target);
    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value);
      this.$emit('ToolbarComponent:click', value);
    }
  }
}
