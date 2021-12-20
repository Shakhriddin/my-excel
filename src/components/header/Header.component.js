import {ExcelComponent} from '../../core/ExcelComponent';

export class HeaderComponent extends ExcelComponent {
  static ClassName = ['excel__header', 'header', 'container'];

  constructor($root, options) {
    super($root, {
      name: 'HeaderComponent',
      listeners: ['input'],
      ...options,
    });
  }

  toHTML() {
    return `
    <div class="header__item">
        <i class="header__logo fas fa-file-excel"></i>
        <input class="header__input"
               type="text"
               name="create-table"
               id="create-table"
               value="New Table"
               spellcheck="false"/>
      </div>
      <div class="header__item">
        <button class="header__btn">
          <i class="fas fa-trash"></i>
        </button>
        <button class="header__btn">
          <i class="fas fa-sign-out-alt"></i>
        </button>
      </div>
    `;
  }

  onInput(event) {

  }
}
