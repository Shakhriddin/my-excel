import {ExcelComponent} from '../../core/ExcelComponent';
import {changeTitle} from '../../redux/actions';
import {defaultTitle} from '../../constants';

export class HeaderComponent extends ExcelComponent {
  static ClassName = ['excel__header', 'header', 'container'];

  constructor($root, options) {
    super($root, {
      name: 'HeaderComponent',
      listeners: ['input'],
      ...options,
    });
    this.metaTitle = document.querySelector('title');
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle;
    this.metaTitle.textContent = title;
    return `
    <div class="header__item">
        <div class="header__logo">
          <img  src="./img/excel-logo.png" alt="Excel">
        </div>
        <input class="header__input"
               type="text"
               name="create-table"
               id="create-table"
               value="${title}"
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
    const $target = event.target;
    $target.onblur = () => {
      this.$dispatch(changeTitle($target.value));
      this.metaTitle.textContent = $target.value;
    };
  }
}
