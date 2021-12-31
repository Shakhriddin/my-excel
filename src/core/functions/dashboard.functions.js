import {storage} from './utils';

function toHTML(key) {
  const model = storage(key);
  const hash = key.split(':');
  const date = new Date(model.openedDate);
  return `
  <li class="dashboard__list-item">
    <a class="dashboard__list-link"
       href="#${hash.join('/')}">
      <i class="fas fa-table"></i>
      ${model.title}
    </a>
    <span>
      <strong>
       ${date.getHours()}:
       ${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}
      </strong>
      <small>${date.toLocaleDateString()}</small>
    </span>
  </li>`;
}

function getAllKeys() {
  const keys = [];
  for (let index = 0; index < localStorage.length; index++) {
    const key = localStorage.key(index);
    if (!key.includes('excel')) {
      continue;
    }
    keys.push(key);
  }
  return keys;
}

export function createLatestTable() {
  const keys = getAllKeys();
  if (!keys.length) {
    return `<div class="dashboard__info">
              <p>There are no tables</p>
              <span>To create a table, click on "New Table".</span>
            </div>`;
  }
  return `
  <div class="dashboard__list-header">
    <span>Recent tables</span>
    <span>Viewed date</span>
  </div>
  <ul class="dashboard__list">
    ${keys.map(toHTML).join('')}
  </ul>`;
}
