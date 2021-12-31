import {Page} from '../core/page/Page';
import {$} from '../core/dom/dom';
import {createLatestTable} from '../core/functions/dashboard.functions';

export class DashboardPage extends Page {
  getRoot() {
    const now = Date.now().toString();
    return $.create('div', ['dashboard']).html(`
     <div class="dashboard__header">
       <h1>My Excel Dashboard</h1>
     </div>
  
     <div class="dashboard__new" style="margin-top: 4rem;">
       <div class="dashboard__row container">
         <a class="dashboard__create"
             href="#excel/${now}">New Table</a>
       </div>
     </div>

     <div class="dashboard__latest">
       <div class="dashboard__row container">${createLatestTable()}</div>
     </div>
    `);
  }
}
