import {DOMListener} from './DOMListener';

export class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
  }

  toHTML() {
    return ``;
  }

  init() {
    this.addDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
  }
}
