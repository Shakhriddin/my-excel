import './sass/index.scss';
import {Excel} from './components/excel/Excel';
import {HeaderComponent} from './components/header/Header.component';
import {ToolbarComponent} from './components/toolbar/Toolbar.component';
import {FormulaComponent} from './components/formula/Formula.component';
import {TableComponent} from './components/table/Table.component';

const excel = new Excel('#app', {
  components: [HeaderComponent, ToolbarComponent,
    FormulaComponent, TableComponent],
});
excel.render();
