import {ExcelComponent} from '../../core/ExcelComponent/ExcelComponent';

export class FormulaComponent extends ExcelComponent {
  static ClassName = ['excel__formula', 'formula', 'container'];

  constructor($root, options) {
    super($root, {
      name: 'FormulaComponent',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
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
    this.$formulaInput = this.$root.find('#formula__input');
    this.$subscribe('TableComponent:select', $cell => {
      this.$formulaInput.textContent($cell.data.value);
    });
    this.$subscribe('ToolbarComponent:click', style => {
      return this.$formulaInput.css(style);
    });
  }

  onInput(event) {
    this.$emit('FormulaComponent:input', event.target.textContent.trim());
  }

  storeChanged({currentText}) {
    this.$formulaInput.textContent(currentText);
  }

  onKeydown(event) {
    if (event.key === 'Enter' || event.key === 'Tab') {
      event.preventDefault();
      this.$emit('FormulaComponent:done');
    }
  }
}
