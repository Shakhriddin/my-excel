import {ExcelComponent} from '../../core/ExcelComponent/ExcelComponent';
import {changeTitle} from '../../redux/actions';
import {defaultTitle} from '../../constants';
import {$} from '../../core/dom/dom';
import {ActiveRoute} from '../../core/routes/ActiveRoute';

export class HeaderComponent extends ExcelComponent {
  static ClassName = ['excel__header', 'header', 'container'];

  constructor($root, options) {
    super($root, {
      name: 'HeaderComponent',
      listeners: ['input', 'click'],
      ...options,
    });
    this.metaTitle = document.querySelector('title');
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle;
    this.metaTitle.textContent = title + ' - My Excel';
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
               style="width:${title.trim().length * 10}px;"
               spellcheck="false"/>
      </div>
      <div class="header__item">
        <button class="header__btn" data-btn="delete">
          <i class="fas fa-trash" data-btn="delete"></i>
        </button>
        <button class="header__btn" data-btn="exit">
          <i class="fas fa-sign-out-alt" data-btn="exit"></i>
        </button>
      </div>
    `;
  }

  onInput(event) {
    const $target = event.target;

    $target.style.width = $target.value.trim().length * 10 + 'px';

    $target.onblur = () => {
      this.$dispatch(changeTitle($target.value));
      this.metaTitle.textContent = $target.value + ' - My Excel';
    };
  }

  onClick(event) {
    const $target = $(event.target);
    if ($target.data.btn === 'delete') {
      const decision = confirm('Do you really want to delete this table?');
      if (decision) {
        localStorage.removeItem('excel:' + ActiveRoute.param);
        return ActiveRoute.navigate('');
      }
    } else if ($target.data.btn === 'exit') {
      return ActiveRoute.navigate('');
    }
  }
}
