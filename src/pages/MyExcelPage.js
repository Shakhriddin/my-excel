import {Page} from '../core/Page';
import {createStore} from '../core/store/createStore';
import {rootReducer} from '../redux/rootReducer';
import {normalizeInitialState} from '../redux/initState';
import {debounce, storage} from '../core/functions/utils';
import {Excel} from '../components/excel/Excel';
import {HeaderComponent} from '../components/header/Header.component';
import {ToolbarComponent} from '../components/toolbar/Toolbar.component';
import {TableComponent} from '../components/table/Table.component';
import {FormulaComponent} from '../components/formula/Formula.component';

function storageName(param) {
  return 'excel:' + param;
}

export class MyExcelPage extends Page {
  getRoot() {
    const params = this.params ? this.params : Date.now().toString();
    const state = storage(storageName(params));
    const initialState = normalizeInitialState(state);
    const store = createStore(rootReducer, initialState);

    const stateListener = debounce(state => {
      storage(storageName(params), state);
    }, 300);

    store.subscribe(stateListener);

    this.excel = new Excel({
      components: [HeaderComponent, ToolbarComponent,
        FormulaComponent, TableComponent],
      store,
    });

    return this.excel.getRoot();
  }

  afterRender() {
    this.excel.init();
  }

  destroy() {
    this.excel.destroy();
  }
}
