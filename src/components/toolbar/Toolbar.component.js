import {ExcelComponent} from '../../core/ExcelComponent';

export class ToolbarComponent extends ExcelComponent {
  static ClassName = ['excel__toolbar', 'toolbar', 'container'];

  constructor($root, optoins) {
    super($root, {
      name: 'ToolbarComponent',
      listeners: ['click'],
    });
  }

  toHTML() {
    return `
      <button class="toolbar__btn">
        <i class="fas fa-bold"></i>
      </button>
      <button class="toolbar__btn">
        <i class="fas fa-italic"></i>
      </button>
      <button class="toolbar__btn">
        <i class="fas fa-align-left"></i>
      </button>
      <button class="toolbar__btn">
        <i class="fas fa-align-center"></i>
      </button>
      <button class="toolbar__btn">
        <i class="fas fa-align-right"></i>
      </button>
    `;
  }

  onClick(event) {
    console.log(event.target);
  }
}
