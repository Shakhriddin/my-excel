import {ExcelComponent} from '../../core/ExcelComponent';

export class FormulaComponent extends ExcelComponent {
  static ClassName = ['excel__formula', 'formula', 'container'];

  constructor($root) {
    super($root, {
      name: 'FormulaComponent',
      listeners: [],
    });
  }

  toHTML() {
    return ` 
    <div class="formula__info">
      f<span>X</span>
    </div>
    <div class="formula__input"
         contenteditable="true"
         spellcheck="false">
    </div>
    `;
  }
}
