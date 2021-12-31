import {Page} from '../core/page/Page';
import {createStore} from '../core/store/createStore';
import {rootReducer} from '../redux/rootReducer';
import {normalizeInitialState} from '../redux/initState';
import {Excel} from '../components/excel/Excel';
import {HeaderComponent} from '../components/header/Header.component';
import {ToolbarComponent} from '../components/toolbar/Toolbar.component';
import {TableComponent} from '../components/table/Table.component';
import {FormulaComponent} from '../components/formula/Formula.component';
import {StateProcessor} from '../core/page/StateProcessor';
import {LocalStorageClient} from '../core/clients/LocalStorage';


export class MyExcelPage extends Page {
  constructor(param) {
    super(param);

    this.storeSub = null;
    this.processor = new StateProcessor(
        new LocalStorageClient(this.params));
  }

  async getRoot() {
    const state = await this.processor.get();
    const initialState = normalizeInitialState(state);
    const store = createStore(rootReducer, initialState);

    this.storeSub = store.subscribe(this.processor.listen);

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
    this.storeSub.unsubscribe();
  }
}
