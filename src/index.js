import {Excel} from './components/excel/Excel';
import {HeaderComponent} from './components/header/Header.component';
import {ToolbarComponent} from './components/toolbar/Toolbar.component';
import {FormulaComponent} from './components/formula/Formula.component';
import {TableComponent} from './components/table/Table.component';
import {createStore} from './core/createStore';
import {rootReducer} from './redux/rootReducer';
import {debounce, storage} from './core/utils';
import {initState} from './redux/initState';
import './sass/index.scss';


const store = createStore(rootReducer, initState);
const stateListener = debounce(state => {
  storage('excel-state', state);
}, 300);

store.subscribe(stateListener);

const excel = new Excel('#app', {
  components: [HeaderComponent, ToolbarComponent,
    FormulaComponent, TableComponent],
  store,
});

excel.render();
