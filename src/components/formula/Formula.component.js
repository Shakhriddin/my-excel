import {ExcelComponent} from '../../core/ExcelComponent';

export class FormulaComponent extends ExcelComponent {
  static ClassName = ['excel__formula', 'formula', 'container'];

  constructor($root, options) {
    super($root, {
      name: 'FormulaComponent',
      listeners: ['input', 'keydown'],
      ...options,
    });
  }

  toHTML() {
    return ` 
    <div class="formula__info">
      f<span>X</span>
    </div>
    <div class="formula__input"
         id="formula__input"
         contenteditable="true"
         spellcheck="false">
    </div>
    `;
  }

  init() {
    super.init();
    const formulaInput = this.$root.find('#formula__input');
    this.$subscribe('TableComponent:select', ($cell) => {
      return formulaInput.textContent($cell.textContent());
    });
  }

  onInput(event) {
    this.$emit('FormulaComponent:input', event.target.textContent.trim());
  }

  onKeydown(event) {
    if (event.key === 'Enter' || event.key === 'Tab') {
      event.preventDefault();
      this.$emit('FormulaComponent:done');
    }
  }
}
