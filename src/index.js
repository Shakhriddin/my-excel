import {DashboardPage} from './pages/DashboardPage';
import {MyExcelPage} from './pages/MyExcelPage';
import {Router} from './core/routes/Router';
import './sass/index.scss';

new Router('#app', {
  dashboard: DashboardPage,
  excel: MyExcelPage,
});


