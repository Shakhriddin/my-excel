import {ExcelComponent} from '../../core/ExcelComponent';

export class FormulaComponent extends ExcelComponent {
  static ClassName = ['excel__formula', 'formula', 'container'];

  constructor($root) {
    super($root, {
      name: 'FormulaComponent',
      listeners: ['input', 'click'],
    });
  }

  toHTML() {
    return ` 
    <div class="formula__info">
      f<sub>x</sub>
    </div>
    <div class="formula__input"
         contenteditable="true"
         spellcheck="false">
    </div>
    `;
  }

  onInput(event) {
    console.log(this.$root, event.target.textContent.trim());
  }

  onClick() {

  }
}
