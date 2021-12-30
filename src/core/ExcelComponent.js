import {DOMListener} from './DOMListener';

export class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.subscribe = options.subscribe || [];
    this.store = options.store;
    this.unsubscribers = [];
    this.prepare();
  }

  toHTML() {
    return ``;
  }

  prepare() {
  }

  $emit(eventName, ...args) {
    this.emitter.emit(eventName, ...args);
  }

  $subscribe(eventName, func) {
    this.emitter.subscribe(eventName, func);
    this.unsubscribers.push(func);
  }

  $dispatch(action) {
    this.store.dispatch(action);
  }


  storeChanged() {
  }

  isWatching(key) {
    return this.subscribe.includes(key);
  }

  init() {
    this.addDOMListeners();
    this;
  }

  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach(unsub => unsub());
  }
}
